
import { createApiFactory } from '../config/api-client';

const serviceApi = createApiFactory('/offer');

export const getEntity = (entity_id) => serviceApi.getById(entity_id);
export const entitySave = (entityData) => serviceApi.create(entityData);
export const entityUpdate = (entity_id,entityData) => serviceApi.update(entity_id,entityData);
export const deleteEntity = (entity_id) => serviceApi.delete(entity_id);
export const getEntitysList = () => serviceApi.getAll();
