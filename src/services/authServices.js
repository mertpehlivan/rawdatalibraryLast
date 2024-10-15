import axios from "axios"
const baseUrl = process.env.REACT_APP_BASE_URL
export const login = async (data) =>{
    try {
        const response = await axios.post(
            `${baseUrl}/api/v1/no-auth/login`,data
        )
        console.log(response.data)
        return response;
    } catch (error) {
        throw error
    }
}
export const register = async (data) =>{
    try {
        const response = await axios.post(
            `${baseUrl}/api/v1/no-auth/register`,data
        )
        console.log(response.data)
        return response;
    } catch (error) {
        throw error
    }
}