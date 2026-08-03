import { DiscussionModel } from "./discussion.model";


export class DiscussionService {


static async getThreads(
courseId:string
){

return await DiscussionModel.getThreads(
courseId
);

}




static async createThread(
courseId:string,
userId:string,
title:string
){

return await DiscussionModel.createThread(
courseId,
userId,
title
);

}





static async getPosts(
threadId:string
){

return await DiscussionModel.getPosts(
threadId
);

}




static async createPost(
threadId:string,
userId:string,
content:string
){

return await DiscussionModel.createPost(
threadId,
userId,
content
);

}



}