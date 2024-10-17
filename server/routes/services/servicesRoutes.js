import { Router } from 'express';
import {
  addService,
  deleteService,
  getAllService,
  getService,
  updateService,
} from '../../controllers/services/servicesController.js';
import { adminAccess } from '../../middlewares/adminAccess.js';
import { checkAccess } from '../../middlewares/checkAccess.js';
import { checkAccessProvider } from '../../middlewares/checkAccess.js';

export const servicesRoutes = Router();

servicesRoutes.get('/', getAllService);
servicesRoutes.get('/:id', getService);

servicesRoutes.post('/add', checkAccessProvider, addService);
servicesRoutes.put('/update/:id', checkAccessProvider, updateService);

// Only Admins for now are able to delete Services
servicesRoutes.delete('/delete/:id', checkAccess, adminAccess, deleteService);
