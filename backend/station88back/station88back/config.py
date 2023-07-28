from dotenv import load_dotenv
import os

load_dotenv()

POSTGRES_HOST = os.environ.get('POSTGRES_HOST')
POSTGRES_PORT = os.environ.get('POSTGRES_PORT')
POSTGRES_NAME = os.environ.get('POSTGRES_NAME')
POSTGRES_USER = os.environ.get('POSTGRES_USER')
POSTGRES_PASS = os.environ.get('POSTGRES_PASSWORD')


SECRET_KEY = os.environ.get('SECRET_KEY')
DEBUG = os.environ.get('DEBUG')
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS').split(' ')