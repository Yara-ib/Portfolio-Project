import { Router } from 'express';
import { signUp, signIn } from '../../controllers/authController.js';

export const authRoutes = Router();

authRoutes.post('/server/routes/signup', signUp);
authRoutes.get('/server/routes/signin', signIn);
