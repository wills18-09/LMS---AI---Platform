import api from "./axios";




// Get single lecture
export const getLecture = async (
  lectureId:string
)=>{

  const response = await api.get(
    `/lectures/${lectureId}`
  );


  return response.data;

};




// Update lecture progress
export const updateLectureProgress = async(
  lectureId:string,
  watched_seconds:number,
  completed:boolean
)=>{


  const response = await api.post(

    `/lectures/${lectureId}/progress`,

    {
      watched_seconds,
      completed
    }

  );


  return response.data;

};




// Create note
export const createLectureNote = async(
  lectureId:string,
  content:string,
  timestamp_seconds:number
)=>{


  const response = await api.post(

    `/lectures/${lectureId}/notes`,

    {
      content,
      timestamp_seconds
    }

  );


  return response.data;

};




// Create bookmark
export const createLectureBookmark = async(
  lectureId:string,
  timestamp_seconds:number
)=>{


  const response = await api.post(

    `/lectures/${lectureId}/bookmarks`,

    {
      timestamp_seconds
    }

  );


  return response.data;

};




// Get notes
export const getLectureNotes = async(
  lectureId:string
)=>{


  const response = await api.get(

    `/lectures/${lectureId}/notes`

  );


  return response.data;

};




// Get bookmarks
export const getLectureBookmarks = async(
  lectureId:string
)=>{


  const response = await api.get(

    `/lectures/${lectureId}/bookmarks`

  );


  return response.data;

};

// Get lecture progress
export const getLectureProgress = async(
  lectureId:string
)=>{

  const response = await api.get(
    `/lectures/${lectureId}/progress`
  );


  return response.data;

};