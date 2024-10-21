import { errorHelper } from '../helpers/errorHelper.js';
import User from '../models/users/UsersModel.js';

// MiddleWare To check if the User has the Admin Role or not
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
