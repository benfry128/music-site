import mysql.connector
import os

from globals import MYSQL_PWD

db = mysql.connector.connect(
    host='albums.c4hk40ksa2ki.us-east-1.rds.amazonaws.com',
    user='admin',
    password=MYSQL_PWD,
    database='albums'
)
cursor = db.cursor()

cursor.execute("update albums set %s = Gaye' where id in (1);")
