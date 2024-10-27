import { Router } from 'express';
import { checkAccess } from '../../middlewares/checkAccess.js';
import {
  banBlogger,
  banSProvider,
  banUser,
  deleteAccount,
  deleteBlogger,
  deleteServiceProvider,
  getAllBloggers,
  getAllSProviders,
  getAllUsers,
  getBloggerProfile,
  getSProviderProfile,
  getUserProfile,
  updateBlogger,
  updateSProvider,
  updateUserProfile,
} from '../../controllers/adminControllers.js';
import { adminAccess } from '../../middlewares/adminAccess.js';

export const authorizationAdminRoutes = Router();
// Users Management
authorizationAdminRoutes.get(
  '/profile/:id',
  checkAccess,
  adminAccess,
  getUserProfile
);

authorizationAdminRoutes.get('/users', checkAccess, adminAccess, getAllUsers);

authorizationAdminRoutes.put(
  '/updateProfile/:id',
  checkAccess,
  adminAccess,
  updateUserProfile
);

authorizationAdminRoutes.put(
  '/banProfile/:id',
  checkAccess,
  adminAccess,
  banUser
);

authorizationAdminRoutes.delete(
  '/deleteAccount/:id',
  checkAccess,
  adminAccess,
  deleteAccount
);

// Bloggers Management
authorizationAdminRoutes.get(
  '/profileBlogger/:id',
  checkAccess,
  adminAccess,
  getBloggerProfile
);

authorizationAdminRoutes.get(
  '/bloggers',
  checkAccess,
  adminAccess,
  getAllBloggers
);

authorizationAdminRoutes.put(
  '/updateBlogger/:id',
  checkAccess,
  adminAccess,
  updateBlogger
);

authorizationAdminRoutes.put(
  '/banBlogger/:id',
  checkAccess,
  adminAccess,
  banBlogger
);

authorizationAdminRoutes.delete(
  '/deleteBlogger/:id',
  checkAccess,
  adminAccess,
  deleteBlogger
);

// Service Providers Management
authorizationAdminRoutes.get(
  '/profileProvider/:id',
  checkAccess,
  adminAccess,
  getSProviderProfile
);

authorizationAdminRoutes.get(
  '/providers',
  checkAccess,
  adminAccess,
  getAllSProviders
);

authorizationAdminRoutes.put(
  '/updateSProvider/:id',
  checkAccess,
  adminAccess,
  updateSProvider
);

authorizationAdminRoutes.put(
  '/banSProvider/:id',
  checkAccess,
  adminAccess,
  banSProvider
);

authorizationAdminRoutes.delete(
  '/deleteSProvider/:id',
  checkAccess,
  adminAccess,
  deleteServiceProvider
);
