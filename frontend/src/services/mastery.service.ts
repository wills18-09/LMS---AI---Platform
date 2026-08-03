import api from "./axios";


export const getMastery = async () => {


  const response =
  await api.get(
    "/mastery"
  );


  return response.data;


};