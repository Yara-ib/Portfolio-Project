import { Router } from 'express';
import {
  getProfileProvider,
  signInProvider,
  signUpProvider,
} from '../../controllers/services/serviceProvidersController.js';
import { checkAccessProvider } from '../../middlewares/checkAccess.js';

export const serviceProvidersRoutes = Router();

serviceProvidersRoutes.post('/newProvider', signUpProvider);
serviceProvidersRoutes.post('/logProvider', signInProvider);

serviceProvidersRoutes.get(
  '/profileProvider',
  checkAccessProvider,
  getProfileProvider
);
