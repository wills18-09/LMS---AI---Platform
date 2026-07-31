import pool from "../../db";


export class LectureFlashcardModel {



static async findByLectureId(
    lectureId:string
){


const result =
await pool.query(

`
SELECT
id,
lecture_id,
question,
answer,
created_at

FROM lecture_flashcards

WHERE lecture_id=$1

ORDER BY created_at ASC

`,

[
lectureId
]

);


return result.rows;


}





static async createMany(

lectureId:string,

cards:{
question:string;
answer:string;
}[]

){


const client =
await pool.connect();


try{


await client.query("BEGIN");



const insertedCards=[];



for(const card of cards){


const result =
await client.query(

`
INSERT INTO lecture_flashcards
(
lecture_id,
question,
answer
)

VALUES
($1,$2,$3)

RETURNING *

`,

[
lectureId,
card.question,
card.answer
]

);



insertedCards.push(
result.rows[0]
);


}



await client.query("COMMIT");



return insertedCards;


}
catch(error){


await client.query("ROLLBACK");

throw error;


}
finally{


client.release();


}


}



}