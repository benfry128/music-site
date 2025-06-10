from os import getenv
from dotenv import load_dotenv
from spotipy import Spotify
from spotipy.oauth2 import SpotifyClientCredentials

load_dotenv()
MYSQL_PWD = getenv('MYSQL_PWD')

def spotipy_setup():
    auth_manager = SpotifyClientCredentials()
    return Spotify(auth_manager=auth_manager)
