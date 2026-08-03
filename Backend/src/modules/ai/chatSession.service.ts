import pool from "../../db";


export class ChatSessionService {



static async createSession(
    userId:string,
    courseId:string
){


const result =
await pool.query(
`
INSERT INTO ai_chat_sessions
(
user_id,
course_id
)

VALUES
($1,$2)

RETURNING *
`,
[
userId,
courseId
]
);


return result.rows[0];

}





static async updateMode(
    sessionId:string,
    mode:string
){


const result =
await pool.query(
`
UPDATE ai_chat_sessions

SET mode=$1

WHERE id=$2

RETURNING *
`,
[
mode,
sessionId
]
);


return result.rows[0];

}





static async getSession(
    sessionId:string
){


const result =
await pool.query(
`
SELECT *
FROM ai_chat_sessions
WHERE id=$1
`,
[
sessionId
]
);


return result.rows[0];

}





static async saveMessage(
    sessionId:string,
    sender:string,
    content:string,
    sources:string[]=[]
){


const result =
await pool.query(
`
INSERT INTO ai_chat_messages
(
session_id,
sender,
content,
source_lecture_ids
)

VALUES
($1,$2,$3,$4)

RETURNING *
`,
[
sessionId,
sender,
content,
sources
]
);


return result.rows[0];

}


}