import api from "./axios";



export const loginUser = async (
    email:string,
    password:string
) => {

    const response = await api.post(
        "/auth/login",
        {
            email,
            password
        }
    );


    return response.data;

};





export const registerUser = async (
    full_name:string,
    email:string,
    password:string
) => {


    const response = await api.post(
        "/auth/register",
        {
            full_name,
            email,
            password
        }
    );


    return response.data;

};