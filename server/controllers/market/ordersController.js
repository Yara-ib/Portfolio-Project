import { errorHelper } from '../../helpers/errorHelper.js';
import Order from '../../models/market/OrdersModel.js';

export const addOrder = async (req, res) => {
  const { user, products, orderStatus, totalAmount } = req.body;
  if (!user || !products || !orderStatus || !totalAmount) {
    return errorHelper(
      req,
      res,
      'Please check the missing values in your order',
      400
    );
  }

  if (
    !products.productInCart ||
    !products.pricePerEach ||
    !products.numberOfProducts
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
    totalAmount,
  });

  await newOrder.save();
  console.log(`New order by ${newOrder.user.username} been made!`);
  res.status(201).json({
    message: `New order by ${newOrder.user.username} been made!`,
    data: newOrder,
  });
};
