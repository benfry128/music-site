from flask import Blueprint, g, jsonify, request
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
        date_released=album[4].strftime('%Y/%m/%d'),
        rating=album[5],
        date_listened=album[6].strftime('%Y/%m/%d') if album[6] else None,
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


@bp.route('/', methods=['GET'])
def get_all_albums():
    g.cursor.execute('SELECT * FROM albums;')

    values = [create_album_dao(album) for album in g.cursor.fetchall()]
    print(values[0].date_listened)
    print(type(values[0].date_listened))

    return jsonify(albums=values), 200


@bp.route('/queue', methods=['GET'])
def get_queue():
    g.cursor.execute('SELECT * FROM albums WHERE queue_position is not null order by queue_position;')

    values = [create_album_dao(album) for album in g.cursor.fetchall()]

    return jsonify(albums=values), 200


@bp.route('/<int:album_id>', methods=['PATCH'])
def patch_album(album_id: int):
    g.cursor.execute('select * from albums where id = %s;', [album_id])

    if not g.cursor.fetchall():
        return jsonify(error = 'Not found'), 404

    patchable_fields = ['name', 'artist', 'image', 'date_released', 'rating', 'date_listened', 'favorite_song', 'recommended', 'queue_position']

    sql_fields = [f for f in request.form if f in patchable_fields]

    if not sql_fields:
        return jsonify(error = 'No patchable fields found'), 400

    sql_values = [request.form[f] for f in sql_fields]
    
    sql_stmt = 'update albums set ' + ', '.join([f'{f} = %s' for f in sql_fields]) + ' where id = %s;'
    sql_values.append(str(album_id))

    g.cursor.execute(sql_stmt, sql_values)

    g.db.commit()

    return jsonify(message='success'), 200
