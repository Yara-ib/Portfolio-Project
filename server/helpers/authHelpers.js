export const errorHelper = (req, res, error) => {
  console.error(`Error: ${error}`);
  return res.status(400).json({ message: error });
};
