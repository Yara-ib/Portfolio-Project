import jwt from 'jsonwebtoken';

export const getNewToken = (id) => {
  return jwt.sign({ id }, process.env.JWToken, { expiresIn: '7d' });
};

export const getTokenFromHeader = (req) => {
  if (req?.headers?.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    return token;
  } else {
    console.log(
      "Someone tried to access Profile page, but token wasn't found!"
    );
    return 'Token not found!';
  }
};

export const verifyTokenToGetID = (token) => {
  return jwt.verify(token, process.env.JWToken, (error, decodedTokenData) => {
    if (!error) {
      return decodedTokenData;
    } else {
      return false;
    }
  });
};
