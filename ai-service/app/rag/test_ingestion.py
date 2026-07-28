from app.rag.ingestion import ingest_document


text = """
Node.js is a JavaScript runtime environment built on Chrome's V8 JavaScript engine.

Node.js allows developers to run JavaScript outside the browser.

The Node.js event loop is responsible for handling asynchronous operations.
It allows Node.js to perform non-blocking I/O operations.

The event loop manages callbacks, promises, timers, and incoming requests.

Because of the event loop, Node.js can handle many connections efficiently.
"""


result = ingest_document(
    course_id="0bacef20-ee9b-458d-8dd3-e489ca47c8de",
    lecture_id="cd795cea-3255-4a33-b412-96311dd8fc92",
    text=text
)


print("Inserted chunks:")
print(result)