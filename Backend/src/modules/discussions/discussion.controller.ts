import {
Request,
Response
} from "express";


import {
DiscussionService
} from "./discussion.service";



export class DiscussionController {



static async getThreads(
req:Request,
res:Response
){

try{


const {
courseId
}=req.params;


const threads =
await DiscussionService.getThreads(
courseId as string
);



res.json({
threads
});


}
catch(error){

console.error(error);

res.status(500).json({
message:"Failed to fetch discussions"
});


}

}







static async createThread(
req:Request,
res:Response
){

try{


const {
courseId,
userId,
title
}=req.body;



const thread =
await DiscussionService.createThread(
courseId,
userId,
title
);



res.json({
thread
});


}
catch(error){

res.status(500).json({
message:"Failed creating thread"
});


}


}








static async getPosts(
req:Request,
res:Response
){

try{


const {
threadId
}=req.params;


const posts =
await DiscussionService.getPosts(
threadId as string
);



res.json({
posts
});


}
catch(error){

res.status(500).json({
message:"Failed fetching posts"
});

}


}








static async createPost(
req:Request,
res:Response
){

try{


const {
threadId,
userId,
content
}=req.body;



const post =
await DiscussionService.createPost(
threadId,
userId,
content
);



res.json({
post
});


}
catch(error){

res.status(500).json({
message:"Failed creating post"
});


}


}



}