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
    // To check if logged in & adminAccess
    user: req.authorizedId,
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

export const getProduct = async (req, res) => {
  if (req.params.id) {
    const product = await Product.findById(req.params.id);
    return res.status(200).json({
      product,
    });
  }
};
