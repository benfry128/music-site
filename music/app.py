from flask import Flask, jsonify, make_response

import tracks
import albums

app = Flask(__name__)

# app.register_blueprint(tracks.bp)
app.register_blueprint(albums.bp)

@app.route("/")
def hello_from_root():
    return jsonify(message='Hello from root!')


@app.route("/hello")
def hello():
    return jsonify(message='Hello from path!')


@app.errorhandler(404)
def resource_not_found(e):
    return make_response(jsonify(error='Not found!'), 404)
