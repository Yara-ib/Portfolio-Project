import { Router } from 'express';
import {
  addService,
  getAllService,
  getService,
  updateService,
} from '../../controllers/services/servicesController';
import { checkAccessProvider } from '../../middlewares/checkAccess.js';

export const servicesRoutes = Router();

servicesRoutes.get('/', getAllService);
servicesRoutes.get('/:id', getService);

servicesRoutes.post('/add', checkAccessProvider, addService);
servicesRoutes.put('/update', checkAccessProvider, updateService);
