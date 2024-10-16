import { Router } from 'express';
import {
  getProfileBlogger,
  signInBlogger,
  signUpBlogger,
} from '../../controllers/blog/bloggersController.js';
import { checkAccessBlogger } from '../../middlewares/checkAccess.js';

export const bloggersRoutes = Router();
bloggersRoutes.post('/newblogger', signUpBlogger);
bloggersRoutes.post('/logblogger', signInBlogger);

bloggersRoutes.get('/profile', checkAccessBlogger, getProfileBlogger);
