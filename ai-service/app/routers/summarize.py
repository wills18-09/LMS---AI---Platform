from fastapi import APIRouter

router = APIRouter(
    prefix="/ai/lectures",
    tags=["Summaries"]
)


@router.get("/summarize")
def summarize():
    return {
        "message": "Summary router working"
    }