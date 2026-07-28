from fastapi import APIRouter

router = APIRouter(
    prefix="/ai/quizzes",
    tags=["Quiz Generation"]
)


@router.get("/")
def quiz():
    return {
        "message": "Quiz generator working"
    }