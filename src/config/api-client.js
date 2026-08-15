
import axios from 'axios';

export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || "http://localhost:9004";

const API = axios.create({
    baseURL: BASE_API_URL
});

export const createApiFactory = (endpoint) => {
    return {
        getAll: async (params = {}) => {
            const response = await API.get(`${endpoint}`, { params });
            return response.data.entitiesList;
        },
        getById: async (id) => {
            const response = await API.get(`${endpoint}/${id}`);
            return response.data;
        },
        getSubRoute: async (id, subPath) => {
            const response = await API.get(`${endpoint}/${id}/${subPath}`);
            return response.data;
        },
        getExtendedRoute: async (extension) => {
            const response = await API.get(`${endpoint}/${extension}`);
            return response.data.entitiesList;
        },
        create: async (data) => {
            const response = await API.post(`${endpoint}`, data);
            return response.data;
        },
        update: async (id,data) => {
            const response = await API.put(`${endpoint}/${id}`, data);
            return response.data;
        },
        delete: async (id) => {
            const response = await API.delete(`${endpoint}/${id}`);
            return response.data;
        }
    };
};

export default API;
