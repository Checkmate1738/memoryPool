from sqlalchemy.dialects.mysql import *
from .engine import engine,Base
from sqlalchemy import TypeDecorator,Column,String,Integer,ForeignKey,DateTime

class User(Base):
    __tablename__ = 'user'
    id = Column(String(8), primary_key=True,unique=True, nullable=False)
    fullName = Column(String(20), nullable=False)
    userName = Column(String(10),unique=True, nullable=False)
    email = Column(String(50), unique=True, nullable=False)
    password = Column(String(64), nullable=False)
    role = Column(String(10), nullable=False)
    datetime = Column(DateTime,nullable=False)

class Notes(Base):
    __tablename__ = 'note'
    id = Column(String(16), primary_key=True,unique=True)
    user_id = Column(ForeignKey('user.id',ondelete="CASCADE"),nullable=False)
    title = Column(String(30),nullable=False)
    description = Column(String(5000),nullable=False)
    datetime = Column(DateTime,nullable=False)

class Tasks(Base):
    __tablename__ = "task"
    id = Column(String(16),nullable=False, primary_key=True,unique=True)
    user_id = Column(ForeignKey("user.id",ondelete="CASCADE"), nullable=False)
    note_id = Column(ForeignKey("note.id",ondelete="CASCADE"))
    title = Column(String(30),nullable=False)
    description = Column(String(255),nullable=False)
    status = Column(String(10), nullable=False)
    completion = Column(DateTime,nullable=False)
    datetime = Column(DateTime,nullable=False)

Base.metadata.create_all(engine)