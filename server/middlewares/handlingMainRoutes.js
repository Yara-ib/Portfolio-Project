import { Router } from 'express';
import { authenticationRoutes } from '../routes/users/authenticationRoutes.js';
import { authorizationRoutes } from '../routes/users/authorizationRoutes.js';
import { bloggersRoutes } from '../routes/blog/bloggersRoutes.js';
import { errorHelper } from '../helpers/errorHelper.js';
import { postsRoutes } from '../routes/blog/PostsRoutes.js';
import { productRoutes } from '../routes/market/ProductsRoute.js';
import { serviceProvidersRoutes } from '../routes/services/serviceProvidersRoutes.js';
import { servicesRoutes } from '../routes/services/servicesRoutes.js';

export const mainRoutes = Router();

// Getting all routes
// Users & Customers Routes
mainRoutes.use('/users', authenticationRoutes);
mainRoutes.use('/users', authorizationRoutes);

// Products Routes
mainRoutes.use('/products', productRoutes);

// Services Routes
mainRoutes.use('/services', serviceProvidersRoutes);
mainRoutes.use('/services', servicesRoutes);

// Blog Routes
mainRoutes.use('/blog', bloggersRoutes);
mainRoutes.use('/blog/posts', postsRoutes);

// Route NOT Found "Last To check"
mainRoutes.use((req, res) => {
  errorHelper(req, res, 'Page Not Found', 404);
});
