import { Router } from 'express';
import { checkAccessBlogger } from '../../middlewares/checkAccess.js';
import {
  addPost,
  getAllPosts,
  getPost,
} from '../../controllers/blog/postsController.js';

export const postsRoutes = Router();

postsRoutes.post('/addPost', checkAccessBlogger, addPost);
postsRoutes.get('/posts', getAllPosts);
postsRoutes.get('/posts/:id', getPost);
