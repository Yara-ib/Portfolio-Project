import { errorHelper } from '../helpers/errorHelper.js';
import Product from '../models/market/ProductsModel.js';

// Need adminAccess Checking first; handled in middlewares
export const addProduct = async (req, res) => {
  const {
    productName,
    mainCategory,
    subCategory,
    brand,
    images,
    color,
    price,
    description,
    countryOfOrigin,
  } = req.body;

  // Checking for missing fields
  if (
    !productName ||
    !mainCategory ||
    !subCategory ||
    !brand ||
    !images ||
    !color ||
    !price ||
    !description ||
    !countryOfOrigin
  ) {
    return errorHelper(req, res, 'Missing Fields!', 400);
  }
  if (
    productName &&
    mainCategory &&
    subCategory &&
    brand &&
    images &&
    color &&
    price &&
    description &&
    countryOfOrigin
  ) {
    const checkIfAddedBefore = await Product.findOne({ productName });
    if (checkIfAddedBefore) {
      return errorHelper(req, res, 'Product already exists.', 409);
    }
  }

  //Creating the new Product
  const newProduct = new Product({
    productName,
    mainCategory,
    subCategory,
    brand,
    images,
    color,
    price,
    description,
    countryOfOrigin,
  });

  await newProduct.save();
  console.log(
    `${newProduct.productName}: ${newProduct.mainCategory} was added to the database!`
  );
  res.status(201).json({
    message: `${newProduct.productName}: ${newProduct.mainCategory} was added to the database!`,
    data: newProduct,
  });
};
