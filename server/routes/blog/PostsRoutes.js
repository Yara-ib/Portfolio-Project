import { Router } from 'express';
import { adminAccess } from '../../middlewares/adminAccess.js';
import { checkAccess } from '../../middlewares/checkAccess.js';
import { checkAccessBlogger } from '../../middlewares/checkAccess.js';
import {
  addPost,
  deletePost,
  getAllPosts,
  getPost,
} from '../../controllers/blog/postsController.js';

export const postsRoutes = Router();

postsRoutes.post('/addPost', checkAccessBlogger, addPost);
postsRoutes.get('/', getAllPosts);
postsRoutes.get('/:id', getPost);

// Only Admins (Originally Users Model) can delete Posts
postsRoutes.delete('/delete/:id', checkAccess, adminAccess, deletePost);
