import { Router } from 'express';
import { signUp, signIn } from '../../controllers/authController.js';

export const authenticationRoutes = Router();

authenticationRoutes.post('/signup', signUp);
authenticationRoutes.post('/signin', signIn);
