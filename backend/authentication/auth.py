import jwt
from fastapi import HTTPException,status
from datetime import datetime, timedelta
from passlib.context import CryptContext
from secrets import token_hex

# Secret key for signing the JWT (use a secure, randomly generated key in 
# production)
key = token_hex(64)

SECRET_KEY = key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing utility
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Hash a password
def get_password_hash(password: str):
    return pwd_context.hash(password)

# Verify a password against its hash
def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

# Create a JWT access token
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"expiry": str(expire)})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Verify and decode a JWT token
def verify_user_token(token: str):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    try:
        
        userRole = "member"
        print(f"\n\n\t {payload.role}")

        if userRole != "member":
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Unauthorized access")
        return payload
    except (jwt.ExpiredSignatureError,jwt.InvalidTokenError):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail="Invalid or expired token")

def verify_admin_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        userRole = payload.role

        if userRole != "admin":
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Unauthorized access")
        return payload
    except (jwt.ExpiredSignatureError,jwt.InvalidTokenError):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail="Invalid or expired token")