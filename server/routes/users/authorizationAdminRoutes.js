import { Router } from 'express';
import { checkAccess } from '../../middlewares/checkAccess.js';
import {
  deleteAccount,
  getProfilePage,
  updateProfile,
} from '../../controllers/authController.js';
import { adminAccess } from '../../middlewares/adminAccess.js';

export const authorizationAdminRoutes = Router();
// In case Admin wanted to view or update any other User profile
authorizationAdminRoutes.get(
  '/profile/:id',
  checkAccess,
  adminAccess,
  getProfilePage
);
authorizationAdminRoutes.put(
  '/updateProfile/:id',
  checkAccess,
  adminAccess,
  updateProfile
);

authorizationAdminRoutes.delete(
  '/deleteAccount/:id',
  checkAccess,
  adminAccess,
  deleteAccount
);
