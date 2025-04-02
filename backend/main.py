from uvicorn import run
from fastapi import FastAPI,Depends
from fastapi.security import OAuth2PasswordBearer
import jwt
from fastapi.middleware.cors import CORSMiddleware
from database.engine import session
from sqlalchemy.orm import sessionmaker
from authentication.main import router as authRouter
from data.main import router as dataRouter


app = FastAPI(title="Memory")
app.include_router(router=authRouter,prefix="/auth")
app.include_router(router=dataRouter,prefix="/data")

origins = [
    "http://192.168.100.56:1738",
    "http://localhost:1738",
]

app.add_middleware(CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True
)

def get_db():

    db = session()

    try:
        yield db
    finally:
        db.commit()
        db.close()

home = "192.168.100.56"

iphone = "172.20.10.13"

#"""
#if __name__=="__main__":
#run("main:app", reload=True,host=home, port=3560)
#"""