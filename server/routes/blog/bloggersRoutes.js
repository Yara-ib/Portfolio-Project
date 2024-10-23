import { Router } from 'express';
import {
  deleteBlogger,
  getProfileBlogger,
  signInBlogger,
  signUpBlogger,
  updateBlogger,
} from '../../controllers/blog/bloggersController.js';
import { checkAccessBlogger } from '../../middlewares/checkAccess.js';
import { adminAccess } from '../../middlewares/adminAccess.js';

export const bloggersRoutes = Router();
// Authorization
bloggersRoutes.post('/newblogger', signUpBlogger);
bloggersRoutes.post('/logblogger', signInBlogger);

// Profile & Account Management
bloggersRoutes.get('/profile', checkAccessBlogger, getProfileBlogger);
bloggersRoutes.put('/profile/update', checkAccessBlogger, updateBlogger);
bloggersRoutes.delete(
  '/profile/delete',
  checkAccessBlogger,
  adminAccess,
  deleteBlogger
);
