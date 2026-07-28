from fastapi import APIRouter

from app.models.flashcards import (
    FlashcardRequest,
    FlashcardResponse
)

from app.rag.retriever import get_lecture_chunks

from app.core.llm import generate_text

from app.core.prompts import FLASHCARD_PROMPT

import json



router = APIRouter(
    prefix="/ai/flashcards",
    tags=["Flashcards"]
)



@router.post("/", response_model=FlashcardResponse)
def generate_flashcards(
    request: FlashcardRequest
):


    chunks = get_lecture_chunks(
        request.lecture_id
    )


    if not chunks:

        return {
            "flashcards": []
        }



    context = "\n\n".join(
        chunks
    )



    response = generate_text(
        FLASHCARD_PROMPT,
        context
    )



    try:

        flashcards = json.loads(
            response
        )


    except Exception:

        return {
            "flashcards": []
        }



    return {
        "flashcards": flashcards
    }