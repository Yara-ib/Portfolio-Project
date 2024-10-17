import { Router } from 'express';
import { checkAccessBlogger } from '../../middlewares/checkAccess.js';
import { addPost } from '../../controllers/blog/postsController.js';

export const postsRoutes = Router();

postsRoutes.post('/addPost', checkAccessBlogger, addPost);
