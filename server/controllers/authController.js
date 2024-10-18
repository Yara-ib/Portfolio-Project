import { hash, verify } from 'argon2';
import { checkValidId } from '../../helpers/checkValidId.js';
import { errorHelper } from '../helpers/errorHelper.js';
import { getNewToken } from '../helpers/tokensHelper.js';
import User from '../models/users/UsersModel.js';

export const signUp = async (req, res) => {
  const { username, email, password, shippingAddress } = req.body;

  // Checking missing data
  if (!username && !email && !password && !shippingAddress) {
    return errorHelper(req, res, 'Missing Fields!', 400);
  }

  if (!username) {
    return errorHelper(req, res, 'Missing Username!', 400);
  }

  if (!email) {
    return errorHelper(req, res, 'Missing Email!', 400);
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
    return errorHelper(req, res, 'Missing Shipping Address!', 400);
  }
  if (!password) {
    return errorHelper(req, res, 'Missing Password!', 400);
  }

  // checks if (email || username) was already signed up or exists before
  const emailExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });

  if (emailExists) {
    return errorHelper(req, res, 'Email already exists.', 409);
  }
  if (usernameExists) {
    return errorHelper(req, res, 'Username already exists.', 409);
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
  console.log('New User been Added to database!');
  res.status(201).json({
    message: `Welcome ${shippingAddress.firstName}! We're thrilled to have you on board!`,
    data: newUser,
  });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const emailCheck = await User.findOne({ email });

  if (!email || !password) {
    // 400 Bad Request
    return errorHelper(req, res, 'Please fill in the required fields', 400);
  } else if (emailCheck && password) {
    const passwordCheck = await verify(emailCheck.password, password);
    if (emailCheck && passwordCheck) {
      if (!emailCheck.bannedOrNot) {
        // Personalizing Welcome messages
        return res.status(200).json({
          message: `Welcome back ${emailCheck.shippingAddress.firstName}`,
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
    return errorHelper(req, res, 'User Not Found.', 404);
  }
};

export const getProfilePage = async (req, res) => {
  res.status(200).json({
    message: 'Welcome back to your Profile Page',
  });
};

export const updateProfile = async (req, res) => {
  const {
    profilePicture,
    shippingAddress: {
      firstName,
      lastName,
      location,
      city,
      country,
      telephone,
    },
  } = req.body;

  if (req.params.id) {
    if (!checkValidId(req)) {
      return errorHelper(req, res, 'Please enter a valid id', 400);
    } else {
      const profileToUpdate = await User.findByIdAndUpdate(
        req.params.id,
        {
          profilePicture,
          shippingAddress: {
            firstName,
            lastName,
            location,
            city,
            country,
            telephone,
          },
        },
        {
          // To make sure the returned value is updated
          // because default for findByIdAndUpdate returns the old document
          new: true,
        }
      );
    }

    if (profileToUpdate) {
      console.log(`Profile was successfully updated!`);
      return res.status(200).json({
        message: 'Profile was successfully updated!',
        profileToUpdate,
      });
    } else {
      return errorHelper(req, res, 'No Profile matches that id!', 404);
    }
  }
};

