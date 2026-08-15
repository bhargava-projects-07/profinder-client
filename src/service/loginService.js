
import axios from 'axios';
import { BASE_API_URL } from '../constants/server-urls';

const apiUrl = BASE_API_URL + "/login";

export const checkLogin = async (loginData) =>{
    try
    {
        const response = await axios.post( apiUrl,loginData );
        return response.data;
    }
    catch(error)
    {
        throw error;
    }
}