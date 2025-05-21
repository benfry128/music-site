from os import getenv
from dotenv import load_dotenv

load_dotenv()
MYSQL_PWD = getenv('MYSQL_PWD')