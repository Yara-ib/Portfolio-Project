import { model, Schema } from 'mongoose';

const ProductsSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    color: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    afterDiscount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    countryOfOrigin: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = model('Product', ProductsSchema);
export default Product;
