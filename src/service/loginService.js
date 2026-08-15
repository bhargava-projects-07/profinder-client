
import { createApiFactory } from '../config/api-client';

const serviceApi = createApiFactory('/login');

export const checkLogin = (loginData) => serviceApi.create(loginData);
