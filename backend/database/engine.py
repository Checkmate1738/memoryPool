from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

username = "lantern"
password = "rayo254"
host = "localhost"
port = 3306
database = "memory"

engine = create_engine(f"mysql+pymysql://{username}:{password}@{host}:{port}/{database}")

try:
    with engine.connect() as connection:
        print("Connection successful!")
except Exception as e:
    print(f"Error: {e}")

session = sessionmaker(autoflush=False, autocommit=False, bind=engine)

Base = declarative_base()

#C:\Users\Kazi Clean\AppData\Roaming\IDM\