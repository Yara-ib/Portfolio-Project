import { errorHelper } from '../../helpers/errorHelper.js';
import Order from '../../models/market/OrdersModel.js';
import User from '../../models/users/UsersModel.js';
// import { session } from './paymentController.js';
import dotenv from 'dotenv';
import Stripe from 'stripe';

// Getting environment variables
dotenv.config();

// POST Method: Allowed For Users after Signing In
export const addOrder = async (req, res) => {
  const user = await User.findById(req.authorizedId);
  const { products, orderStatus } = req.body;
  if (!products || !orderStatus) {
    return errorHelper(
      req,
      res,
      'Please check the missing values in your order',
      400
    );
  }

  if (
    !products[0].productInCart ||
    !products[0].pricePerEach ||
    !products[0].numberOfProducts
  ) {
    return errorHelper(
      req,
      res,
      "Please fill in all details related to the product you're buying",
      400
    );
  }

  const newOrder = new Order({
    user: req.authorizedId,
    products,
    orderStatus,
  });

  await newOrder.save();
  console.log(`New order by ${user} been made!`);

  // Add order to Each User
  user.orders.push(newOrder._id);
  await user.save();
  // Add order details in users
  const userWithOrders = await User.findById(user._id).populate('orders');
  // Logs array of order documents "For debugging"
  console.log(userWithOrders.orders);

  // Add products details to orders
  const OrdersWithProducts = await Order.findById(newOrder._id).populate(
    'products.productInCart'
  );
  // Logs array of order documents "For debugging"
  // console.log(OrdersWithProducts);

  // Stripe Payment Integration
  const stripe = new Stripe(process.env.STRIPE_SK);
  const lineItems = OrdersWithProducts.products.map((product) => {
    return {
      price_data: {
        currency: 'egp',
        product_data: {
          name: product.productInCart.productName,
          description: product.productInCart.description,
        },
        // Converting from piasters to EGP (default behavior for stripe in currencies)
        unit_amount: product.pricePerEach * 100,
      },
      quantity: product.numberOfProducts,
    };
  });

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    success_url:
      // Coupon as Token of gratitude till implementing the FrontEnd
      'https://static.vecteezy.com/system/resources/thumbnails/027/218/578/small_2x/thank-you-for-your-order-printable-illustration-business-thank-you-customer-card-creative-graphic-design-template-soft-watercolor-background-calligraphy-script-text-business-card-vector.jpg',
    cancel_url:
      'https://us.123rf.com/450wm/aquir/aquir1507/aquir150702009/42251991-cancelled-round-orange-grungy-vintage-isolated-stamp.jpg?ver=6',
  });
  // To render the url's passed on the payment result
  res.send({ url: session.url });
};

// GET Method: View Order by Id | Allowed For Users & Admins
export const getOrder = async (req, res) => {
  if (req.params.id) {
    const order = await Order.findById(req.params.id);
    if (order) {
      return res.status(200).json({
        order,
      });
    } else {
      return errorHelper(req, res, "There's no such order", 404);
    }
  }
};

// GET Method | Allowed For Users & Admins
export const getAllOrder = async (req, res) => {
  let orders = await Order.find();

  if (orders && orders.length > 0) {
    return res.status(200).json({
      message: "Here's the list of all Orders",
      orders,
    });
  } else {
    return res.status(404).json({
      message: 'No orders have been found',
      orders: [],
    });
  }
};
