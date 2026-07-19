import { BookmarksModel } from "./bookmarks.model";


export const BookmarksService = {


async createBookmark(
    userId:string,
    lectureId:string,
    timestampSeconds:number | null
){

    return BookmarksModel.create(
        userId,
        lectureId,
        timestampSeconds
    );

}


};