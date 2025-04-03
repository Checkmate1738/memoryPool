from fastapi import APIRouter,Request,Depends,HTTPException,status
from database.engine import session
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from authentication.auth import verify_user_token,verify_admin_token
from pydantic import BaseModel
from secrets import token_hex
from datetime import datetime
from database.database import Tasks,Notes,User

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def verifyAuth(bodyData,headerData):
    user = headerData
    error = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Authentication is tempered")
    unverified = verify_user_token(bodyData.access_token)

    userId = {}

    for i, j in unverified.items():
        if user.get(i) == j:
            if i == "id" and user.get("role") == "member":
                userId[i] = j
                break
            else:
                raise error
    else:   
        raise error

        
    return userId

def verifyAdminAuth(bodyData,headerData):
    user = headerData
    error = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Authentication is tempered")
    unverified = verify_user_token(bodyData.access_token)

    userId = {}

    for i, j in unverified.items():
        if user.get(i) == j:
            if i == "id" and user.get("role") == "member":
                userId[i] = j
                break
            else:
                raise error
    else:   
        raise error

        
    return userId

def get_db():

    db = session()

    try:
        yield db
    finally:
        db.commit()
        db.close()

def getUser(token:str=Depends(oauth2_scheme)):
    return verify_user_token(token=token)

def getAdmin(token:str=Depends(oauth2_scheme)):
    return verify_admin_token(token=token)

class TaskRequest(BaseModel):
    access_token:str
    title:str = "Meet Janel at 15:00hrs"
    description:str = "Our fisrt date, going to Ibiza and enjoy the time we have together"
    is_note:bool=False
    note_id:str=""
    status:str = "Uncharted"
    completion:str = "2025-04-3 15:00:00.0000"

class TaskResponse(BaseModel):
    access_token:str
    task_id:str
    title:str = "Meet Janel at 15:00hrs"
    description:str = "Our fisrt date, going to Ibiza and enjoy the time we have together"
    note_id:str="note id / null if not included"
    status:str = "Uncharted"
    completion:str = "2025-04-4 15:00:00.0000"
    date_time:str = "2025-04-3 14:25:12.4567"

class NoteRequest(BaseModel):
    access_token:str
    title:str="The secret to hapinness"
    description:str="Drink water, i.e; H2O"

class NoteResponse(BaseModel):
    access_token:str
    note_id:str
    title:str="The secret to hapinness"
    description:str="Drink water, i.e; H2O"
    datetime:str="2025-04-3 14:34:54.5432"

class ProfileRequest(BaseModel):
    access_token:str
    fullname:str="John Doe"
    username:str="Doe123"
    email:str="johndoe@example.com"
    password:str="*******"

class ProfileResponse(BaseModel):
    access_token:str
    fullname:str="John Doe"
    username:str="Doe123"
    email:str="johndoe@example.com"
    password:str="*******"

class DelRequest(BaseModel):
    access_token:str
    id:str

# GET methods 

@router.get("/")
async def homePage(user:dict=Depends(getUser),db:Session=Depends(get_db)):
    return {"message":user}

@router.get("/tasks")#,response_model=TaskResponse)
async def fetchTasks(user:dict=Depends(getUser),db:Session=Depends(get_db)):

    info = db.query(Tasks).filter(Tasks.user_id == user["id"]).all()
    return {"message":info}

@router.get("/notes")
async def fetchNotes(user:dict=Depends(getUser),db:Session=Depends(get_db)):

    info = db.query(Notes).filter(Notes.user_id == user["id"]).all()
    return {"message":info}

@router.get("/profile")
async def fetchProfile(user:dict=Depends(getUser),db:Session=Depends(get_db)):

    info = db.query(User).filter(User.id == user["id"]).first()
    return {"message":info}

# POST methods

@router.post("/task", response_model=TaskResponse)
async def newTask(data:TaskRequest,user:dict=Depends(getUser),db:Session=Depends(get_db)):
    userId = verifyAuth(data,user)
    note_id = data.note_id

    acceptedStatus = ["canceled","ongoing","completed","start","paused","uncharted"]

    for i in acceptedStatus:
        if i == data.status:
            break
        else:
            data.status = acceptedStatus[5]

    if data.is_note == False:
        data.note_id = None
        note_id=""
    else:
        _id = db.query(Notes).filter(Notes.id == data.note_id).first()
        if not _id:
            data.note_id = None
            note_id=""

    info = Tasks(
        id=token_hex(8),
        user_id=userId.get("id"),
        note_id=data.note_id,
        title=data.title,
        description=data.description,
        status=data.status,
        completion=data.completion,
        datetime=str(datetime.now())
        )
    
    db.add(info)

    return TaskResponse(
        access_token=data.access_token,
        task_id=info.id,
        title=info.title,
        description=info.description,
        note_id=note_id,
        status=info.status,
        completion=info.completion,
        date_time=info.datetime
    )

@router.post("/note",response_model=NoteResponse)
async def newNote(data:NoteRequest,user:dict=Depends(getUser),db:Session=Depends(get_db)):
    userId = verifyAuth(data,user)

    info = Notes(
        id=token_hex(8),
        user_id=userId.get("id"),
        title=data.title,
        description=data.description,
        datetime=str(datetime.now())
    )

    db.add(info)

    return NoteResponse(
        access_token=data.access_token,
        note_id=info.id,
        title=info.title,
        description=info.description,
        datetime=info.datetime
    )

# PUT methods

@router.put("/task")
async def updTask(data:TaskRequest,user:dict=Depends(getUser),db:Session=Depends(get_db)):
    return {"message":user}

@router.put("/note")
async def updNote(data:NoteRequest,user:dict=Depends(getUser),db:Session=Depends(get_db)):
    return {"message":user}

@router.put("/profile")
async def updProfile(data:ProfileRequest,user:dict=Depends(getUser),db:Session=Depends(get_db)):
    return {"message":user}

# DELETE methods

@router.delete("/task")
async def dltTask(data:DelRequest,user:dict=Depends(getUser),db:Session=Depends(get_db)):
    userId = verifyAuth(data,user)

    info = db.query(Tasks).filter(Tasks.id == data.id).first()

    if info.user_id == userId["id"]:
        db.delete(info)

    return {"message":"Deleted task successfully"}

@router.delete("/note")
async def dltNote(data:DelRequest,user:dict=Depends(getUser),db:Session=Depends(get_db)):
    userId = verifyAuth(data,user)

    info = db.query(Notes).filter(Notes.id == data.id).first()

    if info.user_id == userId["id"]:
        db.delete(info)

    return {"message":"Deleted note successfully"}

@router.delete("/profile")
async def dltProfile(data:DelRequest,user:dict=Depends(getAdmin),db:Session=Depends(get_db)):
    userId = verify_admin_token(data,user)

    if userId:
        info = db.query(User).filter(User.id == data.id).first()

        db.delete(info)

    return {"message":user}