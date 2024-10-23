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
            return this.pricePerEach;
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
      type: String,
      default: function () {
        return this.products.reduce((sum, product) => {
          return sum + product.numberOfProducts * product.afterDiscountPerEach;
        }, 0);
      },
    },
    payThrough: {
      type: String,
      default: 'Not Selected yet',
    },
    paidOrNot: {
      type: String,
      default: 'Not Yet',
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

// Adding the shipping fee that may differ according to location (now it's fixed)
OrdersSchema.virtual('totalAmountToPay').get(() => {
  return this.totalAmount + 50;
});

// For easier & faster accessing orders in database, indexing only the confirmed & delivered
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
