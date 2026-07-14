import {EnrollmentModel} from "./enrollment.model";


export const EnrollmentService={


async enroll(
userId:string,
courseId:string
){

try{

return await EnrollmentModel.create(
userId,
courseId
);


}catch(error:any){

if(error.code==="23505"){
throw new Error(
"Already enrolled in this course"
);
}

throw error;

}


},



async getMyCourses(userId:string){

return EnrollmentModel.findUserCourses(userId);

},



async getStudents(courseId:string){

return EnrollmentModel.findStudents(courseId);

}


};