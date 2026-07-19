import { NotesModel } from "./notes.model";


export const NotesService = {


async createNote(
    userId:string,
    lectureId:string,
    content:string,
    timestampSeconds:number | null
){

    return NotesModel.create(
        userId,
        lectureId,
        content,
        timestampSeconds
    );

}


};