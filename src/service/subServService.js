
import axios from 'axios';
import { BASE_API_URL } from '../constants/server-urls';

let apiEntity = "/subservice";
const apiUrl = BASE_API_URL + apiEntity;

export const getEntity = async (entity_id) => {
    try
    {
        const response = await axios.get(apiUrl+`/${entity_id}`);
        return response.data;
    }
    catch(error)
    {
        throw error;
    }
}

export const getSubService = async (entity_id) => {
    try
    {
        const response = await axios.get(apiUrl+`/${entity_id}/with`);
        return response.data;
    }
    catch(error)
    {
        throw error;
    }
}

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

export const entityUpdate = async ( entity_id,entityData )=>
{
    try
    {
        const response = await axios.put(apiUrl+`/${entity_id}`,entityData );
        return response.data;
    }
    catch(error)
    {
        throw error;
    }
}

export const getEntitysList = async()=>
{
    try
    {
        const response = await axios.get(apiUrl);
        return response.data.entitiesList;
    }
    catch(error)
    {
        throw error;
    }
}

export const getSubServices = async(serviceid)=>
{
    try
    {
        const response = await axios.get(BASE_API_URL+`/subservices/dropdown/${serviceid}`);
        return response.data.entitiesList;
    }
    catch(error)
    {
        throw error;
    }
}


export const deleteEntity = async (id) =>
{
    try
    {
        const response = await axios.delete(apiUrl+`/${id}`);
        return response.data;
    }
    catch(error)
    {
        throw error;
    }
}
