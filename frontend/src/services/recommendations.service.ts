import api from "./axios";


export const getRecommendations = async () => {

  const response =
  await api.get(
    "/recommendations"
  );


  return response.data;

};