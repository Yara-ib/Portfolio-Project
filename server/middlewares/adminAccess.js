import User from '../models/users/UsersModel.js';

export const adminAccess = async (req, res, next) => {
  const userById = await User.findById(req.authorizedId);
  if (userById && userById.adminOrNot) {
    console.log(
      `${userById.username}: (${userById.shippingAddress.firstName}) granted access to Admin DashBoard`
    );
    next();
  } else {
    res.status(403).json({
      message: 'Access Denied, please login again',
    });
  }
};
