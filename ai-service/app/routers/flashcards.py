from fastapi import APIRouter

router = APIRouter(
    prefix="/ai/flashcards",
    tags=["Flashcards"]
)


@router.get("/")
def flashcards():
    return {
        "message": "Flashcards working"
    }