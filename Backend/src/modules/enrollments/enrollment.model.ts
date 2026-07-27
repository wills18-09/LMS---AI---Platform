import pool from "../../db";


export const EnrollmentModel = {


async create(
 userId:string,
 courseId:string
){

const result = await pool.query(
`
INSERT INTO enrollments
(user_id,course_id)
VALUES($1,$2)
RETURNING *
`,
[
 userId,
 courseId
]
);


return result.rows[0];

},







async findUserCourses(
 userId:string
){


const result = await pool.query(
`
SELECT

    c.id,

    c.title,

    c.description,

    c.thumbnail_url,

    e.enrolled_at,


    COALESCE(

        LEAST(

            ROUND(

                (

                    COUNT(
                        DISTINCT CASE
                            WHEN lp.completed = true
                            THEN l.id
                        END
                    )::decimal


                    /


                    NULLIF(
                        COUNT(DISTINCT l.id),
                        0
                    )

                ) * 100,


                2

            ),


            100

        ),


        0

    ) AS progress_percent



FROM enrollments e



JOIN courses c

ON e.course_id = c.id




LEFT JOIN modules m

ON m.course_id = c.id




LEFT JOIN lectures l

ON l.module_id = m.id




LEFT JOIN lecture_progress lp

ON lp.lecture_id = l.id

AND lp.enrollment_id = e.id




WHERE e.user_id = $1




GROUP BY

    c.id,

    c.title,

    c.description,

    c.thumbnail_url,

    e.enrolled_at



`,
[
 userId
]
);



return result.rows;


},







async findStudents(
 courseId:string
){


const result = await pool.query(
`
SELECT

u.id,

u.full_name,

u.email,

e.enrolled_at


FROM enrollments e


JOIN users u

ON e.user_id = u.id



WHERE e.course_id = $1

`,
[
 courseId
]
);



return result.rows;


}



};