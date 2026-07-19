import { Request, Response } from "express";
import { BookmarksService } from "./bookmarks.service";


export const BookmarksController = {


async createBookmark(
req:Request,
res:Response
){

try{

const userId = req.user!.id;

const lectureId = req.params.id as string;

const {
timestamp_seconds
} = req.body;


const bookmark = await BookmarksService.createBookmark(
    userId,
    lectureId,
    timestamp_seconds ?? null
);


res.status(201).json({
    message:"Lecture bookmarked successfully",
    bookmark
});


}catch(error:any){

res.status(500).json({
    message:error.message
});

}

}


};