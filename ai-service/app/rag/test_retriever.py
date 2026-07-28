from app.rag.retriever import retrieve_chunks


results = retrieve_chunks(
    "Explain the Node.js event loop"
)


for chunk in results:
    print("----------------")
    print("Lecture:", chunk["lecture_id"])
    print(chunk["text"])