import pool from "../../db";


export class NotificationModel {



static async getUserNotifications(
    userId:string
){


const result =
await pool.query(

`
SELECT

id,
title,
body,
is_read,
created_at


FROM notifications


WHERE user_id=$1


ORDER BY created_at DESC;

`,
[
userId
]

);


return result.rows;


}






static async markAsRead(
    id:string,
    userId:string
){


const result =
await pool.query(

`
UPDATE notifications


SET

is_read=true


WHERE id=$1
AND user_id=$2


RETURNING *;

`,
[
id,
userId
]

);



return result.rows[0];


}







static async createNotification(
    userId:string,
    title:string,
    body:string
){


const result =
await pool.query(

`
INSERT INTO notifications
(
user_id,
title,
body
)


VALUES
($1,$2,$3)


RETURNING *;

`,
[
userId,
title,
body
]

);



return result.rows[0];


}




}