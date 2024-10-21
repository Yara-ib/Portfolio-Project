import { hash, verify } from 'argon2';
import { errorHelper } from '../../helpers/errorHelper.js';
import { getNewToken } from '../../helpers/tokensHelper.js';
import Blogger from '../../models/users/BloggersModel.js';

// POST Method: Creating New Blogger | Allowed For Anyone
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

  // Hashing Password for security & protection
  let hashedPassword;
  try {
    hashedPassword = await hash(password);
  } catch (error) {
    console.error(`Couldn't hash the password: ${error.message}`);
  }

  // Creating the new instance of the Blogger Model; signing up
  const newBlogger = new Blogger({
    username,
    email,
    password: hashedPassword,
  });

  // Saving it to Database
  await newBlogger.save();
  console.log('New Blogger been Added to database!');
  res.status(201).json({
    message: `Welcome ${newBlogger.username}! We're thrilled to have you on board!`,
    data: newBlogger,
  });
};

// POST Method: Checking information given by the blogger to Sign In
export const signInBlogger = async (req, res) => {
  const { email, password } = req.body;
  const emailCheck = await Blogger.findOne({ email });

  if (!email || !password) {
    // 400 Bad Request
    return errorHelper(req, res, 'Please fill in the required fields', 400);
  } else if (emailCheck && password) {
    const passwordCheck = await verify(emailCheck.password, password);
    if (emailCheck && passwordCheck) {
      if (!emailCheck.bannedOrNot) {
        // Personalizing Welcome messages
        return res.status(200).json({
          message: `Welcome back ${emailCheck.username}`,
          token: getNewToken(emailCheck._id),
          emailCheck,
        });
      } else {
        // 423 Locked || Banned
        return errorHelper(req, res, 'Sorry, but your account is banned!', 423);
      }
    } else {
      // 401 Unauthorized
      return errorHelper(req, res, 'Wrong Password. Please try again', 401);
    }
  } else if (!emailCheck) {
    return errorHelper(req, res, 'Blogger Not Found.', 404);
  }
};

// GET Method: To Access the Profile Page
// Protected Path: Must check permissions before accessing it
export const getProfileBlogger = async (req, res) => {
  res.status(200).json({
    message: 'Welcome back to your Profile Page',
  });
};
