from flask import Blueprint, g, jsonify, request
import mysql.connector
from src.globals import MYSQL_PWD
from src.models.albums import Album
from datetime import date

bp = Blueprint('albums', __name__, url_prefix='/albums')

def create_album_dao(album: list) -> Album:
    return Album(
        id=album[0],
        title=album[1],
        artist=album[2],
        image_url=album[3],
        date_released=album[4].strftime('%Y-%m-%d') + 'T00:00:00Z',
        rating=album[5],
        date_listened=(album[6].strftime('%Y-%m-%d') + 'T00:00:00Z') if album[6] else None,
        favorite_song=album[7],
        ranking=album[8],
        spotify_id=album[9],
        queue_position=album[10],
        url=album[11],
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

    patchable_fields = ['title', 'artist', 'image_url', 'date_released', 'rating', 'date_listened', 'favorite_song', 'ranking', 'queue_position']
    int_fields = ['rating', 'ranking', 'queue_position']
    date_fields = ['date_released', 'date_listened']

    sql_fields = [f for f in request.form if f in patchable_fields]

    if not sql_fields:
        return jsonify(error = 'No patchable fields found'), 400

    sql_values: list[str | int | date | None] = []
    try:
        for field in sql_fields:
            value = request.form[field]
            if value in ('NaN', 'null'):
                sql_values.append(None)
            elif field in int_fields:
                sql_values.append(int(value))
            elif field in date_fields:
                sql_values.append(date.fromisoformat(value))
            else:
                sql_values.append(value)
    except ValueError as e:
        print(f'Value error: {e}')
        return jsonify(error = f'Value error: {e}'), 400
    
    sql_stmt = 'update albums set ' + ', '.join([f'{f} = %s' for f in sql_fields]) + ' where id = %s;'
    sql_values.append(album_id)

    g.cursor.execute(sql_stmt, sql_values)

    g.db.commit()

    return jsonify(message='success'), 200


@bp.route('', methods=['POST'])
def post_album():
    post_fields_needed = ['title', 'artist', 'image_url', 'date_released']
    url_providers = ['spotify_id', 'url']

    if any([not f in request.form for f in post_fields_needed]) or not any([f in request.form for f in url_providers]):
        return jsonify(error = 'Necessary post field missing from request'), 400
    
    full_url = f'https://open.spotify.com/album/{request.form["spotify_id"]}' if 'spotify_id' in request.form else request.form['url']

    g.cursor.execute('select * from albums where url = %s;', [full_url])

    if g.cursor.fetchall():
        return jsonify(error = 'Url already in db'), 400
    
    postable_fields = ['title', 'artist', 'image_url', 'date_released', 'rating', 'date_listened', 'favorite_song', 'ranking', 'queue_position', 'spotify_id']
    int_fields = ['rating', 'ranking', 'queue_position']
    date_fields = ['date_released', 'date_listened']

    sql_fields = [f for f in request.form if f in postable_fields]

    sql_values: list[str | int | date | None] = []
    try:
        for field in sql_fields:
            value = request.form[field]
            if value in ('NaN', 'null'):
                sql_values.append(None)
            elif field in int_fields:
                sql_values.append(int(value))
            elif field in date_fields:
                sql_values.append(date.fromisoformat(value))
            else:
                sql_values.append(value)
    except ValueError as e:
        print(f'Value error: {e}')
        return jsonify(error = f'Value error: {e}'), 400
    
    sql_fields.append('url')
    sql_values.append(full_url)
    
    sql_stmt = f'insert into albums ({", ".join(sql_fields)}) values ({", ".join(["%s"] * len(sql_fields))});'

    g.cursor.execute(sql_stmt, sql_values)

    g.db.commit()

    g.cursor.execute('select * from albums where url = %s;', [full_url])
    album = create_album_dao(g.cursor.fetchall()[0])
    
    return jsonify(album=album), 200


@bp.route('/<int:album_id>/notes', methods=['POST'])
def post_notes(album_id: int):
    notes = request.form.get('notes')
    source = request.form.get('source')

    if not source:
        return jsonify(error = 'Source field empty'), 400

    if notes:
        if len(notes) >= 500:
            return jsonify(error = 'Notes field too long'), 400
    else:
        notes = None

    g.cursor.execute('insert into album_notes (album_id, notes, source) values (%s, %s, %s);', [album_id, notes, source])

    g.db.commit()
    
    return jsonify(message='success'), 200
