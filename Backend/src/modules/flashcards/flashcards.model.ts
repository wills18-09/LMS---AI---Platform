import pool from "../../db";


export class FlashcardModel {


  static async createMany(
    moduleId: string,
    flashcards: {
      question: string;
      answer: string;
    }[]
  ) {


    const client = await pool.connect();


    try {


      await client.query("BEGIN");



      const created = [];



      for (const card of flashcards) {


        const result =
          await client.query(
            `
            INSERT INTO flashcards
            (
              module_id,
              question,
              answer
            )

            VALUES
            ($1,$2,$3)

            RETURNING *
            `,
            [
              moduleId,
              card.question,
              card.answer
            ]
          );


        created.push(
          result.rows[0]
        );

      }



      await client.query("COMMIT");


      return created;



    } catch(error) {


      await client.query("ROLLBACK");

      throw error;


    } finally {


      client.release();

    }

  }





  static async findByModule(
    moduleId: string
  ) {


    const result =
      await pool.query(
        `
        SELECT *
        FROM flashcards
        WHERE module_id = $1
        ORDER BY id
        `,
        [
          moduleId
        ]
      );


    return result.rows;

  }

  static async findByLectureId(
  lectureId:string
){

const result =
await pool.query(
`
SELECT
f.*

FROM flashcards f

JOIN modules m
ON f.module_id = m.id

JOIN lectures l
ON l.module_id = m.id

WHERE l.id=$1

ORDER BY f.id
`,
[
lectureId
]
);


return result.rows;

}


}