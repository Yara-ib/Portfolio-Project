import jwt from 'jsonwebtoken';

// Creating Token using JSON Web Token & setting its Expiration Time
export const getNewToken = (id) => {
  return jwt.sign({ id }, process.env.JWToken, { expiresIn: '7d' });
};

// Getting the Token From Header Request
export const getTokenFromHeader = (req) => {
  if (req?.headers?.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    return token;
  } else {
    console.log("Someone tried to access users' area, but token wasn't found!");
    return 'Token not found!';
  }
};

// Verifying the Token, if it's valid or not
export const verifyTokenToGetID = (token) => {
  return jwt.verify(token, process.env.JWToken, (error, decodedTokenData) => {
    if (!error) {
      return decodedTokenData;
    } else {
      return false;
    }
  });
};
