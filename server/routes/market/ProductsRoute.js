import { Router } from 'express';
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from '../../controllers/productsController.js';
import { adminAccess } from '../../middlewares/adminAccess.js';
import { checkAccess } from '../../middlewares/checkAccess.js';

export const productRoutes = Router();

productRoutes.get('/', getAllProducts);
productRoutes.get('/:id', getProduct);
productRoutes.post('/add', checkAccess, adminAccess, addProduct);
productRoutes.delete('/delete/:id', checkAccess, adminAccess, deleteProduct);
productRoutes.put('/update/:id', checkAccess, adminAccess, updateProduct);
