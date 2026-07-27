import api from "./axios";


export const getMyBadges = async()=>{

  const response =
  await api.get(
    "/badges/me"
  );


  return response.data;

};