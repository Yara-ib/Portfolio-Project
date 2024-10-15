import { model, Schema } from 'mongoose';

const ProductsSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    mainCategory: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      // Reference to another document using ObjectId
      // instead of embedding the whole object
      type: Schema.Types.ObjectId,
      ref: 'Size',
    },
    price: {
      type: Number,
      required: true,
    },
    afterDiscount: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    countryOfOrigin: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = model('Product', ProductsSchema);
export default Product;
