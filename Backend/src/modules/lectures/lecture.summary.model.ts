import pool from "../../db";


export class LectureSummaryModel {


    static async findByLectureId(
        lectureId: string
    ) {

        const result = await pool.query(
            `
            SELECT
                id,
                lecture_id,
                summary,
                created_at

            FROM lecture_summaries

            WHERE lecture_id = $1
            `,
            [
                lectureId
            ]
        );


        return result.rows[0];

    }



    static async create(
        lectureId: string,
        summary: string
    ) {

        const result = await pool.query(
            `
            INSERT INTO lecture_summaries
            (
                lecture_id,
                summary
            )

            VALUES
            (
                $1,
                $2
            )

            RETURNING *
            `,
            [
                lectureId,
                summary
            ]
        );


        return result.rows[0];

    }

}