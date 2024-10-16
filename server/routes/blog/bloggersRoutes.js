import { Router } from 'express';
import {
  signInBlogger,
  signUpBlogger,
} from '../../controllers/blog/bloggersController.js';

export const bloggersRoutes = Router();
bloggersRoutes.post('/newblogger', signUpBlogger);
bloggersRoutes.post('/logblogger', signInBlogger);
