
import { createApiFactory } from '../config/api-client';

const serviceApi = createApiFactory('/user');

export const entitySave = (entityData) => serviceApi.create(entityData);
