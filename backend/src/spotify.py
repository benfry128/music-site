from flask import Blueprint, g, jsonify, request
from src.globals import spotipy_setup

bp = Blueprint('spotify', __name__, url_prefix='/spotify')


@bp.before_request
def prep_spotipy():
    g.sp = spotipy_setup()


@bp.route('/search/<search_str>', methods=['GET'])
def search_albums(search_str: str):
    albums = g.sp.search(q=f'album:{search_str}', type='album', limit=10)['albums']['items']

    return jsonify(albums=albums), 200