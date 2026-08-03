import api from "./axios";


export const getStudyPlan = async (
  courseId:string
) => {


  const response =
  await api.get(
    `/study-plans/${courseId}`
  );


  return response.data;

};