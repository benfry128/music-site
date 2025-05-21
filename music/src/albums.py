from flask import Blueprint, g
import mysql.connector
from src.globals import MYSQL_PWD

bp = Blueprint('albums', __name__, url_prefix='/albums')

@bp.before_request
def load_db():
    g.db = mysql.connector.connect(
        host='albums.c4hk40ksa2ki.us-east-1.rds.amazonaws.com',
        user='admin',
        password=MYSQL_PWD,
        database='albums'
    )
    g.cursor = g.db.cursor()


@bp.after_request
def close_db_connections(response):
    g.db.close()
    g.cursor.close()
    return response


@bp.route('/queue', methods=['GET'])
def get_queue():
    g.cursor.execute('SELECT image FROM albums WHERE queue_position is not null order by queue_position;')

    values = [album[0] for album in g.cursor.fetchall()]
    return values