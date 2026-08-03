from fastapi import APIRouter, HTTPException

from app.models.chat import ChatRequest

from app.core.llm import ask_llm

from app.rag.retriever import retrieve_chunks

from app.core.database import get_db





router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)





@router.post("/chat")
def chat(
    request: ChatRequest
):


    connection = get_db()

    cursor = connection.cursor()



    cursor.execute(
        """
        SELECT mode
        FROM ai_chat_sessions
        WHERE id=%s
        """,
        (
            request.session_id,
        )
    )


    session = cursor.fetchone()



    cursor.close()

    connection.close()





    if not session:

        raise HTTPException(
            status_code=404,
            detail="Chat session not found"
        )



    mode = session[0]







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

        context=context,

        mode=mode

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

        "sources": sources,

        "mode": mode

    }