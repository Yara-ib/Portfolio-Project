import { Types } from 'mongoose';

export const checkValidId = (req, res) => {
    const objectCheck = Types.ObjectId;
  // Using isValid (mongoose method) to check the length of id
  // if it's 12 bytes or 24 hexadecimal characters
  if (objectCheck.isValid(req.params.id)) {
    // Then double check if characters itself are valid and generated by mongoose or not
    if ((String)(new objectCheck(req.params.id)) === req.params.id) {
      return true;
    }
    return false;
  }
  return false;
};