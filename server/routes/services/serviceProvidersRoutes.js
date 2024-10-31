import { Router } from 'express';
import {
  deleteServiceProvider,
  getProfileProvider,
  signInProvider,
  signUpProvider,
  updateServiceProvider,
} from '../../controllers/services/serviceProvidersController.js';
import { adminAccess } from '../../middlewares/adminAccess.js';
import { checkAccessProvider } from '../../middlewares/checkAccess.js';

export const serviceProvidersRoutes = Router();

serviceProvidersRoutes.post('/newProvider', signUpProvider);
serviceProvidersRoutes.post('/logProvider', signInProvider);

// Profile & Account Management
serviceProvidersRoutes.get(
  '/getProvider/:id',
  checkAccessProvider,
  getProfileProvider
);

serviceProvidersRoutes.put(
  '/profile/update/:id',
  checkAccessProvider,
  updateServiceProvider
);
