from app.rag.embeddings import generate_embedding
from app.core.database import get_db



def retrieve_chunks(
    query: str,
    limit: int = 3
):

    query_embedding = generate_embedding(
        query
    )


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