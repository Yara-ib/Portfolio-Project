import { Router } from 'express';
import { signUpBlogger } from '../../controllers/blog/bloggersController.js';

export const bloggersRoutes = Router();
bloggersRoutes.post('/newblogger', signUpBlogger);
