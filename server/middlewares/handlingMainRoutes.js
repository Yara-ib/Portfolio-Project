import { Router } from 'express';
import { authenticationRoutes } from '../routes/users/authenticationRoutes.js';
import { authorizationRoutes } from '../routes/users/authorizationRoutes.js';
import { errorHelper } from '../helpers/errorHelper.js';
import { productRoutes } from '../routes/market/ProductsRoute.js';
import { bloggersRoutes } from '../routes/blog/bloggersRoutes.js';

export const mainRoutes = Router();

// Getting all routes
mainRoutes.use('/users', authenticationRoutes);
mainRoutes.use('/users', authorizationRoutes);

// Product Routes
mainRoutes.use('/products', productRoutes);

// Blog Routes
mainRoutes.use('/blog', bloggersRoutes);

// Route NOT Found "Last To check"
mainRoutes.use((req, res) => {
  errorHelper(req, res, 'Page Not Found', 404);
});
