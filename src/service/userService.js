
import axios from 'axios';
import { BASE_API_URL } from '../constants/server-urls';

let apiEntity = "/user";
const apiUrl = BASE_API_URL + apiEntity;

export const entitySave = async (entityData) => {
    try
    {
        const response = await axios.post(apiUrl,entityData);
        return response.data;
    }
    catch(error)
    {
        throw error;
    }
}
