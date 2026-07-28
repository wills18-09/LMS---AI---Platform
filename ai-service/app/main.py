from fastapi import FastAPI

from app.routers import (
    chat,
    summarize,
    quiz_gen,
    flashcards,
    study_plan,
)

app = FastAPI(
    title="LMS AI Service",
    version="1.0.0"
)

app.include_router(chat.router)
app.include_router(summarize.router)
app.include_router(quiz_gen.router)
app.include_router(flashcards.router)
app.include_router(study_plan.router)


@app.get("/")
def root():
    return {
        "message": "LMS AI Service Running 🚀"
    }