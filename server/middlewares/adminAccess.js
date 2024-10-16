import { errorHelper } from '../helpers/errorHelper.js';
import User from '../models/users/UsersModel.js';

export const adminAccess = async (req, res, next) => {
  const userById = await User.findById(req.authorizedId);
  if (userById && userById.adminOrNot) {
    console.log(
      `${userById.username}: (${userById.shippingAddress.firstName}) granted access to Admin DashBoard`
    );
    next();
  } else {
    errorHelper(req, res, 'Access Denied. Admins Only allowed Here!', 403);
  }
};
