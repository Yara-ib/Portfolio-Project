import jwt from 'jsonwebtoken';

export const getNewToken = (id) => {
  return jwt.sign({ id }, process.env.JWToken, { expiresIn: '7d' });
};

