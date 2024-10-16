import { errorHelper } from '../helpers/errorHelper.js';
import {
  getTokenFromHeader,
  verifyTokenToGetID,
} from '../helpers/tokensHelper.js';
import Blogger from '../models/users/BloggersModel.js';
import User from '../models/users/UsersModel.js';

export const checkAccess = async (req, res, next) => {
  const token = getTokenFromHeader(req);
  const access = verifyTokenToGetID(token);

  if (access) {
    req.authorizedId = access.id;
    const userById = await User.findById(access.id);
    console.log(
      `${userById.username}: (${userById.shippingAddress.firstName}) granted access as a user`
    );
    next();
  } else {
    errorHelper(req, res, 'Access Denied, please try logging in again', 403);
  }
};

export const checkAccessBlogger = async (req, res, next) => {
  const token = getTokenFromHeader(req);
  const access = verifyTokenToGetID(token);

  if (access) {
    req.authorizedId = access.id;
    const BloggerById = await Blogger.findById(access.id);
    console.log(
      `${BloggerById.username}: (${BloggerById.username}) granted access as a blogger`
    );
    next();
  } else {
    errorHelper(req, res, 'Access Denied, please try logging in again', 403);
  }
};
