import User from '../models/UsersModel.js';

export const signUp = async (req, res) => {
  const { username, email, password, shippingAddress } = req.body;

  if (!username && !email && !password && !shippingAddress)
    res.json({ message: 'Please fill in all the required fields.' });

  // checks if (email || username) was already signed up or exists before
  const emailExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });

  if (emailExists) res.json({ message: 'Email already exists.' });
  else if (usernameExists) res.json({ message: 'Username already exists.' });

  const newUser = new User({
    username,
    email,
    password,
    shippingAddress,
  });

  await newUser.save();
  res.status(201).json({
    message: `Welcome ${shippingAddress.firstName}! We're thrilled to have you on board!`,
    data: newUser,
  });
};
