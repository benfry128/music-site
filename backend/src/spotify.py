from flask import Blueprint, g, jsonify, request
from src.globals import spotipy_setup

bp = Blueprint('spotify', __name__, url_prefix='/spotify')


@bp.before_request
def prep_spotipy():
    g.sp = spotipy_setup()


@bp.route('/search/<search_str>', methods=['GET'])
def search_albums(search_str: str):
    albums = g.sp.search(q=f'album:{search_str}', type='album', limit=10)['albums']['items']

    deduped_albums = []

    for album in albums:
        print(album['name'] + album['artists'][0]['name'])
        print([(a['name'] + a['artists'][0]['name']) for a in deduped_albums])
        if (album['name'] + album['artists'][0]['name']) not in [(a['name'] + a['artists'][0]['name']) for a in deduped_albums]:
            deduped_albums.append(album)

    return jsonify(albums=deduped_albums), 200