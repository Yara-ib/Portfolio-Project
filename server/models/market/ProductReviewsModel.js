import { Schema, model } from 'mongoose';

const productReviewsModel = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
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
    rating: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const productReviews = model('productReviews', productReviewsModel);
export default productReviews;
