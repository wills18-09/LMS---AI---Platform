from dotenv import load_dotenv
import os


load_dotenv()


class Settings:

    GROQ_API_KEY = os.getenv(
        "GROQ_API_KEY"
    )

    GEMINI_API_KEY = os.getenv(
        "GEMINI_API_KEY"
    )

    MODEL_NAME = os.getenv(
        "MODEL_NAME",
        "llama-3.1-8b-instant"
    )

    DATABASE_URL = os.getenv(
        "DATABASE_URL"
    )


settings = Settings()