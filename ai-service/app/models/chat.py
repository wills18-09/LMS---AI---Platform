from pydantic import BaseModel



class ChatRequest(BaseModel):

    session_id: str

    message: str

    mode: str = "intermediate"




class ChatResponse(BaseModel):

    reply: str

    sources: list = []