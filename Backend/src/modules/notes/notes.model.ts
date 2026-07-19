import pool from "../../db";


export const NotesModel = {


async create(
    userId:string,
    lectureId:string,
    content:string,
    timestampSeconds:number | null
){

    const result = await pool.query(
    `
    INSERT INTO notes
    (
        user_id,
        lecture_id,
        content,
        timestamp_seconds
    )

    VALUES($1,$2,$3,$4)

    RETURNING *
    `,
    [
        userId,
        lectureId,
        content,
        timestampSeconds
    ]
    );


    return result.rows[0];

}

};