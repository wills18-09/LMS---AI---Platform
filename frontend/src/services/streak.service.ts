import api from "./axios";


export const getMyStreak = async()=>{

    const response =
    await api.get(
        "/streaks/me"
    );


    return response.data;

};




export const updateDailyStreak = async()=>{

    const response =
    await api.post(
        "/streaks/update"
    );


    return response.data;

};