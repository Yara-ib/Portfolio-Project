import { Router } from 'express';
import { addProduct } from '../../controllers/productsController.js';

export const productRoutes = Router();

productRoutes.post('/add', addProduct);
