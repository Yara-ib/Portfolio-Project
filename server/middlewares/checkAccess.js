import { errorHelper } from '../helpers/errorHelper.js';
import {
  getTokenFromHeader,
  verifyTokenToGetID,
} from '../helpers/tokensHelper.js';
import Blogger from '../models/users/BloggersModel.js';
import ServiceProvider from '../models/users/ServiceProviderModel.js';
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

export const checkAccessProvider = async (req, res, next) => {
  const token = getTokenFromHeader(req);
  const access = verifyTokenToGetID(token);

  if (access) {
    req.authorizedId = access.id;
    const ProviderById = await ServiceProvider.findById(access.id);
    console.log(
      `${ProviderById.username}: (${ProviderById.username}) granted access as a service provider`
    );
    next();
  } else {
    errorHelper(req, res, 'Access Denied, please try logging in again', 403);
  }
};
