import { Router } from 'express';
import { authenticationRoutes } from '../routes/users/authenticationRoutes.js';
import { authorizationRoutes } from '../routes/users/authorizationRoutes.js';
import { bloggersRoutes } from '../routes/blog/bloggersRoutes.js';
import { errorHelper } from '../helpers/errorHelper.js';
import { postsRoutes } from '../routes/blog/PostsRoutes.js';
import { productRoutes } from '../routes/market/ProductsRoute.js';
import { serviceProvidersRoutes } from '../routes/services/serviceProvidersRoutes.js';
import { servicesRoutes } from '../routes/services/servicesRoutes.js';
import { ordersRoutes } from '../routes/market/OrdersRoutes.js';

export const mainRoutes = Router();

// Getting all Routes

// ~ General Users, Customers and Admins
// Users Sign Up & Sign In Routes:
mainRoutes.use('/users', authenticationRoutes);
// Restricted Areas: accessible for Users only
mainRoutes.use('/users', authorizationRoutes);

// ~ Market Section Routes::
// Products Routes
mainRoutes.use('/products', productRoutes);
// Orders Routes
mainRoutes.use('/orders', ordersRoutes);

// ~ Services Section Routes::
// Services Routes
mainRoutes.use('/services', servicesRoutes);
// Service Providers Routes
mainRoutes.use('/services', serviceProvidersRoutes);

// ~ Blog Section Routes::
// Posts Routes
mainRoutes.use('/blog/posts', postsRoutes);
// Bloggers Routes
mainRoutes.use('/blog', bloggersRoutes);

// ~ Checking Any wrong Path
// Route NOT Found "Last To check"
mainRoutes.use((req, res) => {
  errorHelper(req, res, 'Page Not Found', 404);
});
