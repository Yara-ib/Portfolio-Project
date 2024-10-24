import { Schema, model } from 'mongoose';

const CommentsModel = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
    commentBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    commentItself: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Comment = model('Comment', CommentsModel);
export default Comment;
