from pydantic import BaseModel, Field
from typing import Optional


class UserAccount(BaseModel):
    email: str
    username: str
    user_password: str
    display_name: str
    user_color: str
    blurb: str


class UpdateUserAccount(BaseModel):
    email: Optional[str] = None
    username: Optional[str] = None
    user_password: Optional[str] = None
    display_name: Optional[str] = None
    user_color: Optional[str] = None
    blurb: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "email": "john@vt.edu",
                "username": "john",
                "user_password": "12345678",
                "display_name": "golden2402",
                "user_color": "#11",
                "blurb": "Some Info",
            }
        }


class AuthorizedUser(BaseModel):
    email: Optional[str] = None
    username: str
    user_password: Optional[str] = None
    display_name: Optional[str] = None
    user_color: Optional[str] = None
    blurb: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "email": "john@vt.edu",
                "username": "john",
                "user_password": "12345678",
                "display_name": "golden2402",
                "user_color": "#11",
                "blurb": "Some Info",
            }
        }
