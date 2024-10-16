import { hash } from 'argon2';
import { errorHelper } from '../../helpers/errorHelper.js';
import Blogger from '../../models/users/BloggersModel.js';

export const signUpBlogger = async (req, res) => {
  const { username, email, password } = req.body;

  // Checking missing data
  if (!username && !email && !password) {
    return errorHelper(req, res, 'Missing Fields!', 400);
  }

  if (!username) {
    return errorHelper(req, res, 'Missing Username!', 400);
  }

  if (!email) {
    return errorHelper(req, res, 'Missing Email!', 400);
  }

  if (!password) {
    return errorHelper(req, res, 'Missing Password!', 400);
  }

  // checks if (email || username) was already signed up or exists before
  const emailExists = await Blogger.findOne({ email });
  const usernameExists = await Blogger.findOne({ username });

  if (emailExists) {
    return errorHelper(req, res, 'Email already exists.', 409);
  }
  if (usernameExists) {
    return errorHelper(req, res, 'Username already exists.', 409);
  }

  // Hashing Password
  let hashedPassword;
  try {
    hashedPassword = await hash(password);
  } catch (error) {
    console.error(`Couldn't hash the password: ${error.message}`);
  }

  // Creating the new Blogger; signing up
  const newBlogger = new Blogger({
    username,
    email,
    password: hashedPassword,
  });

  await newBlogger.save();
  console.log('New Blogger been Added to database!');
  res.status(201).json({
    message: `Welcome ${newBlogger.username}! We're thrilled to have you on board!`,
    data: newBlogger,
  });
};
