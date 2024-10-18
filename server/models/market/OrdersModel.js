import { model, Schema } from 'mongoose';

const OrdersSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    products: [
      {
        productInCart: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        pricePerEach: {
          type: Number,
          required: true,
        },
        afterDiscountPerEach: {
          type: Number,
          default: function () {
            return this.price;
          },
        },
        color: {
          type: String,
        },
        size: {
          type: Schema.Types.ObjectId,
          ref: 'Size',
        },
        numberOfProducts: {
          type: Number,
          required: true,
        },
      },
    ],
    orderStatus: {
      type: String,
      required: true,
      enum: [
        'pending confirmation',
        'confirmed',
        'shipped',
        'delivered',
        'cancelled',
      ],
      default: 'pending confirmation',
    },
    totalAmount: {
      type: Number,
      required: true,
      default: function () {
        return (
          this.products.numberOfProducts * this.products.afterDiscountPerEach
        );
      },
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// For easier accessing orders in database, indexing only the confirmed & delivered
OrdersSchema.index(
  { user: 1 },
  {
    partialFilterExpression: {
      orderStatus: { $in: ['confirmed', 'delivered'] },
    },
  }
);

const Order = model('Order', OrdersSchema);
export default Order;
