import api from "./axios";



export const getAdminUsers = async()=>{

    const response =
    await api.get(
        "/admin/users"
    );

    return response.data;

};




export const updateUserRole = async(
    id:string,
    role:string
)=>{

    const response =
    await api.put(
        `/admin/users/${id}/role`,
        {
            role
        }
    );


    return response.data;

};




export const suspendUser = async(
    id:string
)=>{

    const response =
    await api.put(
        `/admin/users/${id}/suspend`
    );


    return response.data;

};




export const getAdminOverview = async()=>{

    const response =
    await api.get(
        "/admin/analytics/overview"
    );


    return response.data;

};




export const getPendingCourses = async()=>{

    const response =
    await api.get(
        "/admin/courses/pending"
    );


    return response.data;

};




export const approveCourse = async(
    id:string
)=>{

    const response =
    await api.put(
        `/admin/courses/${id}/approve`
    );


    return response.data;

};




export const rejectCourse = async(
    id:string
)=>{

    const response =
    await api.put(
        `/admin/courses/${id}/reject`
    );


    return response.data;

};