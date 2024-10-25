import { errorHelper } from '../../helpers/errorHelper.js';
import Comment from '../../models/blog/CommentsModel.js';
import Post from '../../models/blog/PostsModel.js';

export const addComment = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
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
  } else {
    errorHelper(req, res, 'No Post Found', 400);
  }
};
