import { Router } from 'express';
// import { signUp, signIn } from '../../controllers/authController.js';

export const navRoutes = Router();

navRoutes.get('/about', about);
navRoutes.get('/contact', about);
navRoutes.get('/faq', faq);
