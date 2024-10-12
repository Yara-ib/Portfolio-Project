import { Router } from 'express';
import { signUp, signIn } from '../../controllers/authController.js';

export const authRoutes = Router();

authRoutes.post('/signup', signUp);
authRoutes.get('/signin', signIn);

