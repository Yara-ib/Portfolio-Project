import { Schema, model } from 'mongoose';

const PostsSchema = new Schema(
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
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Blogger',
    },
    category: [
      {
        type: String,
        required: true,
      },
    ],
    image: {
      type: String,
      default: '../assets/images/ArchiMatter.png',
    },
    comments: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = model('Post', PostsSchema);
export default Post;
