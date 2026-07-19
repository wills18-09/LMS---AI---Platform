import { Request, Response } from "express";
import { NotesService } from "./notes.service";


export const NotesController = {


async createNote(
req: Request,
res: Response
){

try{

const userId = req.user!.id;

const lectureId = req.params.id as string;

const {
content,
timestamp_seconds
} = req.body;


const note = await NotesService.createNote(
    userId,
    lectureId,
    content,
    timestamp_seconds ?? null
);


res.status(201).json({
    message:"Note added successfully",
    note
});


}catch(error:any){

res.status(500).json({
    message:error.message
});

}

}


};