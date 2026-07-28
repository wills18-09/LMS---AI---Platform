from fastapi import APIRouter

from app.models.quiz import QuizRequest

from app.rag.retriever import get_lecture_chunks

from app.core.llm import generate_text

from app.core.prompts import QUIZ_PROMPT

import json



router = APIRouter(
    prefix="/ai/quiz",
    tags=["Quiz"]
)



@router.post("/")
def generate_quiz(
    request: QuizRequest
):


    chunks = get_lecture_chunks(
        request.lecture_id
    )


    if not chunks:

        return {
            "questions": []
        }



    context = "\n\n".join(
        chunks
    )



    response = generate_text(
        QUIZ_PROMPT,
        context
    )


    try:

        questions = json.loads(
            response
        )


    except Exception:


        return {
            "questions": [],
            "error": "Invalid AI JSON"
        }



    return {
        "questions": questions
    }