import { Router } from 'express';
import { checkAccess } from '../../middlewares/checkAccess.js';
import {
  getProfilePage,
  updateProfile,
} from '../../controllers/authController.js';

export const authorizationRoutes = Router();
authorizationRoutes.get('/profile', checkAccess, getProfilePage);
authorizationRoutes.put('/updateProfile', checkAccess, updateProfile);
