from fastapi import APIRouter

from app.models.chat import ChatRequest

from app.core.llm import ask_llm

from app.rag.retriever import retrieve_chunks



router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)



@router.post("/chat")
def chat(
    request: ChatRequest
):

    chunks = retrieve_chunks(
        request.message
    )


    if not chunks:

        return {
            "reply": "I couldn't find this in the provided course content.",
            "sources": []
        }



    context = "\n\n".join(
        [
            chunk["text"]
            for chunk in chunks
        ]
    )



    answer = ask_llm(
        question=request.message,
        context=context
    )



    sources = []

    for chunk in chunks:

        sources.append(
            {
                "lecture_id": chunk["lecture_id"],
                "lecture_title": chunk["lecture_title"]
            }
        )



    if answer.strip() == "I couldn't find this in the provided course content.":

        sources = []


    return {
    "reply": answer,
    "sources": sources
}