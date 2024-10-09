import { Schema, model } from 'mongoose';

const PostsModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '../assets/images/ArchiMatter.png',
    },
  },
  { timestamps: true }
);

const Post = model('Post', PostsModel);
export default Post;
