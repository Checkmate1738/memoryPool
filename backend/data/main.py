from fastapi import APIRouter,Request,Depends
from database.engine import session
from fastapi.security import OAuth2PasswordBearer
from authentication.auth import verify_user_token

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def get_db():

    db = session()

    try:
        yield db
    finally:
        db.commit()
        db.close()

def getUser(token:str=Depends(oauth2_scheme)):
    return verify_user_token(token=token)
#print(str(token))

@router.get("/notes")
async def viewNotes(user:dict=Depends(getUser)):
    return {"message":user}