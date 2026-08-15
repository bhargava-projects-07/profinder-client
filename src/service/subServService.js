
import { createApiFactory } from '../config/api-client';

const serviceApi = createApiFactory('/subservice');

export const getEntity = (entity_id) => serviceApi.getById(entity_id);
export const entitySave = (entityData) => serviceApi.create(entityData);

export const getSubService = (entity_id) => serviceApi.getSubRoute(entity_id, 'with');

export const entityUpdate = (entity_id,entityData) => serviceApi.update(entity_id,entityData);
export const deleteEntity = (entity_id) => serviceApi.delete(entity_id);
export const getEntitysList = () => serviceApi.getAll();

export const getSubServices = (serviceid) => serviceApi.getExtendedRoute(`/subservices/dropdown/${serviceid}`); 
