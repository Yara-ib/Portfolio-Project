import { Router } from 'express';
import { signUpProvider } from '../../controllers/services/serviceProvidersController.js';

export const serviceProvidersRoutes = Router();

serviceProvidersRoutes.post('/newProvider', signUpProvider);
