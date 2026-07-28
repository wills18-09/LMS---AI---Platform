from fastapi import APIRouter

router = APIRouter(
    prefix="/ai/study-plan",
    tags=["Study Plan"]
)


@router.get("/")
def study_plan():
    return {
        "message": "Study Plan working"
    }