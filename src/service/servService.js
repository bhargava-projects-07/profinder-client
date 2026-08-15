
import axios from 'axios';
import { BASE_API_URL } from '../constants/server-urls';

let apiEntity = "/service";
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

export const getService = async (entity_id) => {
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

export const getServices = async()=>
{
    try
    {
        const response = await axios.get(BASE_API_URL+"/services/dropdown");
        return response.data.entitiesList;
    }
    catch(error)
    {
        throw error;
    }
}

export const getTrendingServices = async()=>
{
    try
    {
        const response = await axios.get(BASE_API_URL+"/services/trending");
        return response.data.trendingServices;
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
