import { Router } from 'express';
import { authRoutes } from '../routes/users/authRoutes.js';
import { errorHelper } from '../helpers/authHelpers.js';

export const mainRoutes = Router();

mainRoutes.use('/', authRoutes);

// Route NOT Found "Last To check"
mainRoutes.use((req, res) => {
  errorHelper(req, res, 'Page Not Found', 404);
});
