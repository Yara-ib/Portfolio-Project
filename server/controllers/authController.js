import { hash } from 'argon2';
import { errorHelper } from '../helpers/authHelpers.js';
import User from '../models/UsersModel.js';

export const signUp = async (req, res) => {
  const { username, email, password, shippingAddress } = req.body;

  // Checking missing data
  if (!username && !email && !password && !shippingAddress) {
    return errorHelper(req, res, 'Missing Fields!');
  }

  if (!username) {
    return errorHelper(req, res, 'Missing Username!');
  }

  if (!email) {
    return errorHelper(req, res, 'Missing Email!');
  }

  if (
    !shippingAddress ||
    !shippingAddress.firstName ||
    !shippingAddress.lastName ||
    !shippingAddress.location ||
    !shippingAddress.city ||
    !shippingAddress.country ||
    !shippingAddress.telephone
  ) {
    return errorHelper(req, res, 'Missing Shipping Address!');
  }
  if (!password) {
    return errorHelper(req, res, 'Missing Password!');
  }

  // checks if (email || username) was already signed up or exists before
  const emailExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });

  if (emailExists) {
    return errorHelper(req, res, 'Email already exists.');
  }
  if (usernameExists) {
    return errorHelper(req, res, 'Username already exists.');
  }

  // Hashing important information; Password, location, telephone
  let hashedPassword, hashedTelephone, hashedLocation;
  try {
    hashedPassword = await hash(password);
    hashedTelephone = await hash(shippingAddress.telephone);
    hashedLocation = await hash(shippingAddress.location);
  } catch (error) {
    console.error(`Couldn't hash the password: ${error.message}`);
  }

  // Creating the new User; signing up
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    shippingAddress: {
      ...shippingAddress,
      location: hashedLocation,
      telephone: hashedTelephone,
    },
  });

  await newUser.save();
  console.log('New User Added to database!');
  res.status(201).json({
    message: `Welcome ${shippingAddress.firstName}! We're thrilled to have you on board!`,
    data: newUser,
  });
};
