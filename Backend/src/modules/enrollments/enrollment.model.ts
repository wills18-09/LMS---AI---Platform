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
[userId,courseId]
);

return result.rows[0];

},



async findUserCourses(userId:string){

const result = await pool.query(
`
SELECT
c.id,
c.title,
c.description,
c.thumbnail_url,
e.enrolled_at,
e.progress_percent

FROM enrollments e

JOIN courses c
ON e.course_id=c.id

WHERE e.user_id=$1

`,
[userId]
);


return result.rows;

},



async findStudents(courseId:string){

const result = await pool.query(
`
SELECT
u.id,
u.full_name,
u.email,
e.enrolled_at,
e.progress_percent

FROM enrollments e

JOIN users u
ON e.user_id=u.id

WHERE e.course_id=$1
`,
[courseId]
);


return result.rows;

}


};