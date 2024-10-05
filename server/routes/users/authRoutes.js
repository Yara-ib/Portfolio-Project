import { Router } from 'express';
import { signUp } from '../../controllers/authController.js';

export const authRoutes = Router();

authRoutes.post('/server/routes/signup', signUp);
