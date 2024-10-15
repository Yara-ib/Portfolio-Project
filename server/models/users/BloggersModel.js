import { Schema, model } from 'mongoose';

const BloggerSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 4,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    biography: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: '../assets/images/profilePic.png',
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    adminOrNot: {
      type: Boolean,
      default: false,
    },
    bannedOrNot: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Blogger = model('Blogger', BloggerSchema);
export default Blogger;
