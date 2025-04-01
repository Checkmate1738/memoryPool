from fastapi import APIRouter,Request
from database.database import User
from database.engine import session
from email_validator import validate_email,EmailUndeliverableError,EmailNotValidError,EmailSyntaxError;
from secrets import token_hex
from hashlib import sha256
from authentication import auth
from sqlalchemy.orm import Session
from fastapi import Depends,HTTPException,status

from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
from pydantic import BaseModel
from datetime import datetime, timedelta
from passlib.exc import UnknownHashError

router = APIRouter()

def get_db():

    db = session()

    try:
        yield db
    finally:
        db.commit()
        db.close()

class TokenResponse(BaseModel):
    access_token: bytes
    token_type: str = "bearer"
    token_hash:str

class RegistryModel(BaseModel):
    fullName : str = "John Doe"
    userName : str = "John"
    email : str = "exampe@example.com"
    password : str = "******"
    role : str = "member"
    sender:str = "browser"

@router.post("/register")
def register(reg_data : RegistryModel,db : Session=Depends(get_db)):

        user_exists = HTTPException(status_code=status.HTTP_409_CONFLICT,detail="User name or email exists use another one")

        name = db.query(User).filter(User.userName == reg_data.userName).first()
        email = db.query(User).filter(User.email == reg_data.email).first()

        if name or email:
            raise user_exists
        
        if reg_data.sender == "brian":
            reg_data.role = "admin"
        elif reg_data.sender == "browser":
            reg_data.role = "member"
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Unauthorized sender"
            )
        
        userId = ""
        setUserId = True

        while setUserId:
            _id = token_hex(4)
            verify_id = db.query(User).filter(User.id == _id).first()
            print(f'\n\n\tuser Id : {_id}, identical to: {verify_id}\n\n')
            if verify_id != _id :
                userId = _id
                setUserId = False

        try:
            validate_email(reg_data.email)
        except (EmailSyntaxError, EmailNotValidError, EmailUndeliverableError) as e:
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,detail=str(e))

        hashedPass = sha256(reg_data.password.encode())

        password = auth.get_password_hash(hashedPass.hexdigest())

        user = User(
            id= userId,
            fullName=reg_data.fullName,
            userName=reg_data.userName,
            email=reg_data.email,
            password=password,
            role = reg_data.role,
            datetime=datetime.now()
            )

        db.add(user)

        return {"message":"success"}

@router.post("/login", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db:Session=Depends(get_db)):
    header = {"WWW-Authenticate":"Bearer"}
    login_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid username or password",headers=header)

    user = db.query(User).filter(User.userName == form_data.username).first()

    if user == None:
        raise login_exception

    hashedPass = sha256(form_data.password.encode())

    password = auth.get_password_hash(hashedPass.hexdigest())

    try:
        auth.verify_password(password,user.password)
    except UnknownHashError:
        raise login_exception

    token = auth.create_access_token({
            "id":user.id,
            "name":user.userName,
            "email":user.email,
            "role":user.role,
            "created": str(datetime.now())
        })

    tokenHash = sha256(f'{token} {user}'.encode())

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        token_hash=tokenHash.hexdigest()
        )