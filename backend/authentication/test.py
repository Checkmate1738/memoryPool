from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from .auth import *

app = FastAPI()

# OAuth2PasswordBearer for retrieving tokens
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# In-memory user data for demonstration (use a database in production)
fake_users_db = {
    "john": {
        "username": "john",
        "hashed_password": get_password_hash("password123"),
        "full_name": "John Doe",
        "email": "john@example.com",
    }
}

# Get user details
def get_user(username: str):
    return fake_users_db.get(username)

# Authenticate user credentials
def authenticate_user(username: str, password: str):
    user = get_user(username)
    if user and verify_password(password, user["hashed_password"]):
        return user
    return None

# Dependency to protect routes
def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = verify_token(token)
    if not payload:
        raise credentials_exception
    username = payload.get("sub")
    if not username:
        raise credentials_exception
    user = get_user(username)
    if not user:
        raise credentials_exception
    return user

# Token endpoint for login
@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user["username"]})
    return {"access_token": access_token, "token_type": "bearer"}

# Protected route
@app.get("/users/me")
def read_users_me(current_user: dict = Depends(get_current_user)):
    return current_user
