from app.rag.chunking import chunk_text
from app.rag.embeddings import generate_embedding
from app.core.database import get_db


def ingest_document(
    course_id: str,
    lecture_id: str,
    text: str
):

    chunks = chunk_text(
        text,
        chunk_size=500,
        overlap=50
    )

    db = get_db()

    cursor = db.cursor()

    inserted_chunks = []

    try:

        for chunk in chunks:

            embedding = generate_embedding(chunk)

            query = """
            INSERT INTO document_chunks
            (
                course_id,
                lecture_id,
                chunk_text,
                embedding
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s
            )
            RETURNING id;
            """

            cursor.execute(
                query,
                (
                    course_id,
                    lecture_id,
                    chunk,
                    embedding
                )
            )

            inserted_chunks.append(
                cursor.fetchone()[0]
            )


        db.commit()

        return inserted_chunks


    except Exception as e:

        db.rollback()

        raise e


    finally:

        cursor.close()
        db.close()