import { Router } from 'express';
import { addService } from '../../controllers/services/servicesController';
import { checkAccessProvider } from '../../middlewares/checkAccess.js';

export const servicesRoutes = Router();

servicesRoutes.post('/addService', checkAccessProvider, addService);
