from uvicorn import run
from fastapi import FastAPI,Depends
from fastapi.security import OAuth2PasswordBearer
import jwt
from fastapi.middleware.cors import CORSMiddleware
from database.engine import session
from sqlalchemy.orm import sessionmaker
from authentication.main import router as authRouter
from dashboard.main import router as dashboardRouter


app = FastAPI(title="Memory")
app.include_router(router=authRouter,prefix="/auth")
app.include_router(router=dashboardRouter,prefix="/dashboard")

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


