from flask import Blueprint, g
import mysql.connector
from src.globals import MYSQL_PWD
from src.models.albums import Album

bp = Blueprint('albums', __name__, url_prefix='/albums')

def create_album_dao(album: list) -> Album:
    return Album(
        id=album[0],
        title=album[1],
        artist=album[2],
        image_url=album[3],
        date_released=album[4],
        rating=album[5],
        date_listened=album[6],
        favorite_song=album[7],
        recommended_by=album[8],
        ranking=album[9],
        spotify_id=album[10],
        queue_position=album[11],
        url=album[12],
    )

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
    g.cursor.execute('SELECT * FROM albums WHERE queue_position is not null order by queue_position;')

    values = [create_album_dao(album) for album in g.cursor.fetchall()]
    return values