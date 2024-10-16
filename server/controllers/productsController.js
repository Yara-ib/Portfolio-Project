import { checkValidId } from '../helpers/checkValidId.js';
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
    if (product) {
      return res.status(200).json({
        product,
      });
    } else {
      return res.status(404).json({
        message: 'There\'s no such product',
      });
    }
  }
};

export const deleteProduct = async (req, res) => {
  if (req.params.id) {
    if (!checkValidId(req)) {
      return res.status(400).json({
        message: 'Please enter a valid id',
      });
    } else {
      const productIDToDelete = await Product.findByIdAndDelete(req.params.id);
      if (productIDToDelete) {
        console.log(`Product was successfully deleted!`);
        return res.status(200).json({
          message: 'Product was successfully deleted!',
        });
      } else {
        return res.status(404).json({
          message: 'No product matches that id!',
        });
      }
    }
  }
};

export const updateProduct = async (req, res) => {
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

  if (req.params.id) {
    if (!checkValidId(req)) {
      return res.status(400).json({
        message: 'Please enter a valid id',
      });
    } else {
      const productToUpdate = await Product.findByIdAndUpdate(
        req.params.id,
        {
          productName,
          mainCategory,
          subCategory,
          brand,
          images,
          color,
          price,
          description,
          countryOfOrigin,
        },
        {
          // To make sure the returned value is updated
          // because default for findByIdAndUpdate returns the old document
          new: true,
        }
      );
      if (productToUpdate) {
        console.log(`Product was successfully updated!`);
        return res.status(200).json({
          message: 'Product was successfully updated!',
          productToUpdate,
        });
      } else {
        return res.status(404).json({
          message: 'No product matches that id!',
        });
      }
    }
  }
};
