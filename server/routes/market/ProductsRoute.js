import { Router } from 'express';
import {
  addProduct,
  getProduct,
} from '../../controllers/productsController.js';
import { adminAccess } from '../../middlewares/adminAccess.js';
import { checkAccess } from '../../middlewares/checkAccess.js';

export const productRoutes = Router();

productRoutes.post('/add', checkAccess, adminAccess, addProduct);
productRoutes.get('/:id', getProduct);
