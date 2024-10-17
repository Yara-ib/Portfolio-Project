import { Router } from 'express';
import { signInProvider, signUpProvider } from '../../controllers/services/serviceProvidersController.js';

export const serviceProvidersRoutes = Router();

serviceProvidersRoutes.post('/newProvider', signUpProvider);
serviceProvidersRoutes.post('/logProvider', signInProvider);
