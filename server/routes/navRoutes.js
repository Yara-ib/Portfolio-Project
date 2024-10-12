import { Router } from 'express';

export const navRoutes = Router();

navRoutes.get('/about', about);
navRoutes.get('/contact', about);
navRoutes.get('/faq', faq);
