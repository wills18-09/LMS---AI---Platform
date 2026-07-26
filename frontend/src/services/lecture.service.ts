import api from "./axios";


// =============================
// PROGRESS
// =============================


export const getLectureProgress = async (
  lectureId:string
) => {

  const response =
    await api.get(
      `/lectures/${lectureId}/progress`
    );


  return response.data;

};




export const updateLectureProgress = async (
  lectureId:string,
  watched_seconds:number,
  completed:boolean=false
) => {


  const response =
    await api.post(

      `/lectures/${lectureId}/progress`,

      {
        watched_seconds,
        completed
      }

    );


  return response.data;

};






// =============================
// NOTES
// =============================


export const getLectureNotes = async (
  lectureId:string
)=>{


  const response =
    await api.get(

      `/lectures/${lectureId}/notes`

    );


  return response.data;


};





export const createLectureNote = async (

  lectureId:string,

  content:string,

  timestamp_seconds:number

)=>{


  const response =
    await api.post(

      `/lectures/${lectureId}/notes`,

      {
        content,
        timestamp_seconds
      }

    );


  return response.data;


};







// =============================
// BOOKMARKS
// =============================



export const getLectureBookmarks = async (

  lectureId:string

)=>{


  const response =
    await api.get(

      `/lectures/${lectureId}/bookmarks`

    );


  return response.data;


};







export const createLectureBookmark = async (

  lectureId:string,

  timestamp_seconds:number

)=>{


  const response =
    await api.post(

      `/lectures/${lectureId}/bookmarks`,

      {
        timestamp_seconds
      }

    );


  return response.data;


};