from flask import Flask, jsonify, make_response

import src.tracks as tracks
import src.albums as albums
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.register_blueprint(tracks.bp)
app.register_blueprint(albums.bp)

@app.errorhandler(404)
def resource_not_found(e):
    return make_response(jsonify(error='Not found!'), 404)
