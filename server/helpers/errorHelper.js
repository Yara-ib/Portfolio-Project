export const errorHelper = (req, res, error, statusCode) => {
  console.error(`Error: ${error}`);
  return res.status(statusCode).json({ message: error });
};
