import { errorHelper } from '../../helpers/errorHelper.js';
import Comment from '../../models/blog/CommentsModel.js';

export const addComment = async (req, res) => {
  const { title, commentItself } = req.body;

  if (!title || !commentItself) {
    errorHelper(req, res, 'Please fill in all the required fields', 400);
  }

  const newComment = new Comment({
    post: req.params.id,
    title,
    commentItself,
    user: req.authorizedId,
  });
  await newComment.save();
  console.log('New comment been added!');

  res.status(201).json({
    message: 'Your comment been added.',
    comment: newComment,
  });
};
