from flask import Blueprint, g, jsonify
import mysql.connector
import os

bp = Blueprint('tracks', __name__, url_prefix='/tracks')

@bp.before_request
def load_db():
    print("HI")
    # MYSQL_PWD = os.getenv('MYSQL_PWD')

    # g.db = mysql.connector.connect(
    #     host='localhost',
    #     user='root',
    #     password=MYSQL_PWD,
    #     database='spotify_toolkit'
    # )
    # g.cursor = g.db.cursor()

@bp.route('/<int:track_id>', methods=['GET'])
def get_by_id(track_id: int):
    # g.cursor.execute('SELECT * FROM tracks WHERE id = %s', [track_id])

    # values = g.cursor.fetchall()[0]
    values = [0, 1]
    return jsonify(v=values)

@bp.route('', methods=['GET'])
def get_all():
    # g.cursor.execute('SELECT * FROM tracks')
    values = [0, 1]
    # values = g.cursor.fetchall()
    return jsonify(v=values)