import { errorHelper } from '../../helpers/errorHelper.js';
import Order from '../../models/market/OrdersModel.js';
import User from '../../models/users/UsersModel.js';

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
  console.log(`New order by ${user.shippingAddress.firstName} been made!`);
  res.status(201).json({
    message: `New order by ${user.shippingAddress.firstName} been made!`,
    data: newOrder,
  });

  // Add order to Each User
  user.orders.push(newOrder._id);
  await user.save();
  // Add order details in users
  const userWithOrders = await User.findById(user._id).populate('orders');
  console.log(userWithOrders.orders); // Logs array of order documents
};
