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
  },
  { timestamps: true }
);

const Post = model('Post', PostsSchema);
export default Post;
