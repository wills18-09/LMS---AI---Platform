import psycopg2

from app.core.config import settings


def get_db():

    connection = psycopg2.connect(
        settings.DATABASE_URL
    )

    return connection