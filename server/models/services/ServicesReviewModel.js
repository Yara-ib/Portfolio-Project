import { Schema, model } from 'mongoose';

const servicesReviewModel = new Schema(
  {
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Service',
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    reviewItself: {
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

const servicesReview = model('servicesReview', servicesReviewModel);
export default servicesReview;
