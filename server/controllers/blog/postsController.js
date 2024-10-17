import Post from '../../models/blog/PostsModel.js';

// Need Blogger Checking first; handled in middlewares
export const addPost = async (req, res) => {
  const { title, description, author, category, image } = req.body;

  // Checking for missing fields
  if (!title || !description || !author || !category) {
    return errorHelper(req, res, 'Missing Fields!', 400);
  }
  if (title && description && author && category) {
    const checkIfAddedBefore = await Post.findOne({ title });
    if (checkIfAddedBefore) {
      return errorHelper(req, res, 'Post title already exists.', 409);
    }
  }

  //Creating the new Post
  const newPost = new Post({
    title,
    description,
    author: req.authorizedId,
    category,
    image,
  });

  await newPost.save();
  console.log(
    `${newPost.title}: ${newPost.category} was added to the database!`
  );
  res.status(201).json({
    message: `${newPost.title}: ${newPost.category} was added to the database!`,
    data: newPost,
  });
};

export const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  const countPosts = await Post.countDocuments();
  if (posts && countPosts > 0) {
    return res.status(200).json({
      message: "Here's the list of all posts",
      posts,
    });
  } else {
    return res.status(404).json({
      message: 'No posts been found',
      posts: [],
    });
  }
};

export const getPost = async (req, res) => {
  if (req.params.id) {
    const post = await Post.findById(req.params.id);
    if (post) {
      return res.status(200).json({
        post,
      });
    } else {
      return errorHelper(req, res, "There's no such post", 404);
    }
  }
};
