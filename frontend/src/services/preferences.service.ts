import api from "./axios";


export const getDifficulty = async () => {

  const response =
  await api.get(
    "/preferences/difficulty"
  );

  return response.data;

};



export const updateDifficulty = async (
  difficulty_mode:string
) => {

  const response =
  await api.post(
    "/preferences/difficulty",
    {
      difficulty_mode
    }
  );

  return response.data;

};