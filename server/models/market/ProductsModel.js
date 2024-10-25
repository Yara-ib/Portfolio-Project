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
    // Can't have empty values
    images: [
      {
        type: String,
        required: true,
      },
    ],
    // Could be empty list, but array is required
    color: {
      type: [String],
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
      default: function () {
        return this.price;
      },
    },
    description: {
      type: String,
      required: true,
    },
    countryOfOrigin: {
      type: String,
      required: true,
    },
    totalStock: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
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
    toJSON: { virtuals: true },
  }
);

// Adding Virtual properties
// Getting & updating the current stock after each order
ProductsSchema.virtual('currentStock').get(function () {
  return this.totalStock - this.sold;
});

const Product = model('Product', ProductsSchema);
export default Product;
