import api from "./axios";



export const getAssignmentsByCourse = async(
  courseId:string
)=>{

  const response =
    await api.get(
      `/assignments/course/${courseId}`
    );


  return response.data;

};






export const submitAssignment = async(
  assignmentId:string,
  file:File
)=>{


const formData =
new FormData();



formData.append(
  "file",
  file
);




const response =
await api.post(

`/assignments/${assignmentId}/submit`,

formData,

{
 headers:{
  "Content-Type":"multipart/form-data"
 }
}

);



return response.data;


};








export const createAssignment = async(
data:any
)=>{


const response =
await api.post(

"/assignments",

data

);



return response.data;


};







export const gradeSubmission = async(
submissionId:string,
grade:number,
feedback:string
)=>{


const response =
await api.put(

`/assignments/submissions/${submissionId}/grade`,

{

grade,

feedback

}

);



return response.data;


};

// ================================
// STUDENT SUBMISSIONS
// ================================


export const getMySubmissions = async()=>{


  const response =
    await api.get(
      "/assignments/submissions/me"
    );


  return response.data;


};