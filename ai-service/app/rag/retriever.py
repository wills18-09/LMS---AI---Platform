from app.core.database import get_db
from app.rag.embeddings import generate_embedding


def retrieve_chunks(
    query: str,
    limit: int = 3
):
    """
    Retrieve the most relevant transcript chunks
    using pgvector similarity search.
    Used by the AI Chat endpoint.
    """

    query_embedding = generate_embedding(query)

    db = get_db()
    cursor = db.cursor()

    try:

        sql = """
        SELECT
            dc.id,
            dc.lecture_id,
            l.title,
            dc.chunk_text

        FROM document_chunks dc

        JOIN lectures l
            ON dc.lecture_id = l.id

        ORDER BY dc.embedding <=> %s::vector

        LIMIT %s;
        """

        cursor.execute(
            sql,
            (
                str(query_embedding),
                limit
            )
        )

        results = cursor.fetchall()

        chunks = []

        for row in results:

            chunks.append(
                {
                    "id": str(row[0]),
                    "lecture_id": str(row[1]),
                    "lecture_title": row[2],
                    "text": row[3]
                }
            )

        return chunks

    finally:

        cursor.close()
        db.close()


def get_lecture_chunks(lecture_id: str):

    db = get_db()
    cursor = db.cursor()

    try:

        print(
            "SEARCHING LECTURE:",
            lecture_id
        )


        cursor.execute(
            """
            SELECT COUNT(*)
            FROM document_chunks
            WHERE lecture_id=%s
            """,
            (lecture_id,)
        )


        print(
            "CHUNK COUNT:",
            cursor.fetchone()
        )


        sql = """
        SELECT chunk_text
        FROM document_chunks
        WHERE lecture_id = %s
        ORDER BY created_at ASC;
        """


        cursor.execute(
            sql,
            (
                lecture_id,
            )
        )


        results = cursor.fetchall()


        return [
            row[0]
            for row in results
        ]

    finally:

        cursor.close()
        db.close()