from pydantic import BaseModel
from typing import List



class FlashcardRequest(BaseModel):

    lecture_id: str



class Flashcard(BaseModel):

    question: str

    answer: str



class FlashcardResponse(BaseModel):

    flashcards: List[Flashcard]