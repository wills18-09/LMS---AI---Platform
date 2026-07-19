import pool from "../../db";


export const BookmarksModel = {


async create(
    userId:string,
    lectureId:string,
    timestampSeconds:number | null
){

    const result = await pool.query(
    `
    INSERT INTO bookmarks
    (
        user_id,
        lecture_id,
        timestamp_seconds
    )

    VALUES($1,$2,$3)

    RETURNING *
    `,
    [
        userId,
        lectureId,
        timestampSeconds
    ]
    );


    return result.rows[0];

}


};