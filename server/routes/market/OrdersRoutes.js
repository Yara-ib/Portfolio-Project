import { Router } from 'express';
import { addOrder } from '../../controllers/market/ordersController.js';
import { checkAccess } from '../../middlewares/checkAccess.js';

export const ordersRoutes = Router();

ordersRoutes.post('/add', checkAccess, addOrder);
