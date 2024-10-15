import User from '../models/users/UsersModel.js';

export const bannedCheck = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && !user.bannedOrNot) {
    next();
  } else {
    console.log(
      `${user.username}: (${user.shippingAddress.firstName}) been banned from access`
    );
    res.status(403).json({
      message: "Access Denied. You've been banned!",
    });
  }
};
