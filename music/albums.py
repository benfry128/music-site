from flask import Blueprint, g, jsonify
import mysql.connector
import os

bp = Blueprint('albums', __name__, url_prefix='/albums')

@bp.before_request
def load_db():
    MYSQL_PWD = os.getenv('MYSQL_PWD')

    g.db = mysql.connector.connect(
        host='localhost',
        user='root',
        password=MYSQL_PWD,
        database='albums'
    )
    g.cursor = g.db.cursor()
    print("HI")

@bp.route('/queue', methods=['GET'])
def get_by_id():
    g.cursor.execute('SELECT id FROM albums WHERE queue_position is not null order by queue_position;')

    values = [value[0] for value in g.cursor.fetchall()]
    print(values)
    return values
