import pool from "../../db";


export class DiscussionModel {



static async getThreads(
    courseId:string
){

const result =
await pool.query(

`
SELECT

dt.id,
dt.title,
dt.created_at,

u.full_name AS creator

FROM discussion_threads dt


JOIN users u

ON dt.created_by=u.id


WHERE dt.course_id=$1


ORDER BY dt.created_at DESC;

`,
[
courseId
]

);


return result.rows;

}







static async createThread(
courseId:string,
userId:string,
title:string
){

const result =
await pool.query(

`
INSERT INTO discussion_threads(

course_id,
created_by,
title

)

VALUES($1,$2,$3)


RETURNING *;

`,
[
courseId,
userId,
title
]

);


return result.rows[0];

}








static async getPosts(
threadId:string
){

const result =
await pool.query(

`
SELECT

dp.id,
dp.content,
dp.created_at,

u.full_name AS author


FROM discussion_posts dp


JOIN users u

ON dp.user_id=u.id


WHERE dp.thread_id=$1


ORDER BY dp.created_at ASC;

`,
[
threadId
]

);


return result.rows;

}








static async createPost(
threadId:string,
userId:string,
content:string
){

const result =
await pool.query(

`
INSERT INTO discussion_posts(

thread_id,
user_id,
content

)


VALUES($1,$2,$3)


RETURNING *;

`,
[
threadId,
userId,
content
]

);


return result.rows[0];

}



}