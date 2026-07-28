from pydantic import BaseModel
from typing import List



class QuizRequest(BaseModel):

    lecture_id: str



class QuizOption(BaseModel):

    option_text: str

    is_correct: bool



class QuizQuestion(BaseModel):

    question_text: str

    options: List[QuizOption]



class QuizResponse(BaseModel):

    questions: List[QuizQuestion]