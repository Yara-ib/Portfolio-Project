import { Router } from 'express';
import {
  addOrder,
  getAllOrder,
  getOrder,
} from '../../controllers/market/ordersController.js';
import { checkAccess } from '../../middlewares/checkAccess.js';

export const ordersRoutes = Router();

ordersRoutes.post('/add', checkAccess, addOrder);
ordersRoutes.get('/', checkAccess, getAllOrder);
ordersRoutes.get('/:id', checkAccess, getOrder);
