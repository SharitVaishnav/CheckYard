import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = async (method,URL,bodyData) => {
    try{
        const response = await axiosInstance({
            method:`${method}`,
            url : `${URL}`,
            data : bodyData,
        });
        return response;
    }
    catch(error){
        console.log(error);
    }
    
}