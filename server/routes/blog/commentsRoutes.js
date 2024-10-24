import { Router } from 'express';
import { checkAccess } from '../../middlewares/checkAccess.js';
import { addComment } from '../../controllers/blog/commentsController.js';

export const commentsRoutes = Router();
commentsRoutes.post('/:id/add', checkAccess, addComment);
