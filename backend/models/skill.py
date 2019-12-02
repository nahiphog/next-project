from config import Config
from flask_login import UserMixin
from models.base_model import BaseModel
from models.user import User
import peewee as pw

class Skill(BaseModel):
    name = pw.CharField(null=False)