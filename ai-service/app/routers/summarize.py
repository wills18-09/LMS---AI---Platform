from fastapi import APIRouter
from pydantic import BaseModel

from app.rag.retriever import get_lecture_chunks
from app.core.llm import generate_text
from app.core.prompts import SUMMARY_PROMPT
from app.core.database import get_db


router = APIRouter(
    prefix="/summary",
    tags=["Summary"]
)


class SummaryRequest(BaseModel):
    lecture_id: str



@router.post("/")
def summarize(
    request: SummaryRequest
):

    chunks = get_lecture_chunks(
        request.lecture_id
    )


    if not chunks:
        return {
            "summary": "No lecture content found.",
            "sources": []
        }


    context = "\n\n".join(
        chunks
    )


    summary = generate_text(
        SUMMARY_PROMPT,
        context
    )


    db = get_db()
    cursor = db.cursor()

    try:

        cursor.execute(
            """
            SELECT id, title
            FROM lectures
            WHERE id = %s
            """,
            (
                request.lecture_id,
            )
        )

        lecture = cursor.fetchone()


    finally:

        cursor.close()
        db.close()



    return {
        "summary": summary,
        "sources": [
            {
                "lecture_id": str(lecture[0]),
                "lecture_title": lecture[1]
            }
        ]
        if lecture
        else []
    }