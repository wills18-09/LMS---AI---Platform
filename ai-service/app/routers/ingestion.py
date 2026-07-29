from fastapi import APIRouter
from pydantic import BaseModel

from app.rag.ingestion import ingest_document


router = APIRouter(
    prefix="/ingest",
    tags=["Ingestion"]
)


class IngestionRequest(BaseModel):

    course_id: str
    lecture_id: str
    transcript: str



@router.post("/")
def ingest(
    request: IngestionRequest
):

    print("INGEST REQUEST RECEIVED")
    print("LECTURE ID:", request.lecture_id)
    print("TRANSCRIPT:", request.transcript[:100])



    chunks = ingest_document(
        course_id=request.course_id,
        lecture_id=request.lecture_id,
        text=request.transcript
    )


    return {
        "message": "Lecture ingested successfully",
        "chunks_created": len(chunks)
    }