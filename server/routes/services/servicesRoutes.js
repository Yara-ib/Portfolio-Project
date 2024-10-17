import { Router } from 'express';
import {
  addService,
  updateService,
} from '../../controllers/services/servicesController';
import { checkAccessProvider } from '../../middlewares/checkAccess.js';

export const servicesRoutes = Router();

servicesRoutes.post('/add', checkAccessProvider, addService);
servicesRoutes.put('/update', checkAccessProvider, updateService);
