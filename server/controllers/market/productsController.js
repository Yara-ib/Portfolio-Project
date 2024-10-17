import { checkValidId } from '../../helpers/checkValidId.js';
import { errorHelper } from '../../helpers/errorHelper.js';
import Product from '../../models/market/ProductsModel.js';

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
      return errorHelper(req, res, "There's no such product", 404);
    }
  }
};

export const deleteProduct = async (req, res) => {
  if (req.params.id) {
    if (!checkValidId(req)) {
      return errorHelper(req, res, 'Please enter a valid id', 400);
    } else {
      const productIDToDelete = await Product.findByIdAndDelete(req.params.id);
      if (productIDToDelete) {
        console.log(`Product was successfully deleted!`);
        return res.status(200).json({
          message: 'Product was successfully deleted!',
        });
      } else {
        return errorHelper(req, res, 'No product matches that id!', 404);
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
      return errorHelper(req, res, 'Please enter a valid id', 400);
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
        return errorHelper(req, res, 'No product matches that id!', 404);
      }
    }
  }
};

export const getAllProducts = async (req, res) => {
  // converting it to changeable request query when connected to the database; removing the "await"
  // General query depends on the values server gets in the request
  let products = Product.find();

  // Filter By productName
  if (req.query.productName) {
    products = products.find({
      productName: { $regex: req.query.productName, $options: 'i' },
    });
  }

  // Filter By mainCategory
  if (req.query.mainCategory) {
    products = products.find({
      mainCategory: { $regex: req.query.mainCategory, $options: 'i' },
    });
  }

  // Filter By subCategory
  if (req.query.subCategory) {
    products = products.find({
      subCategory: { $regex: req.query.subCategory, $options: 'i' },
    });
  }
  // Filter By brand
  if (req.query.brand) {
    products = products.find({
      brand: { $regex: req.query.brand, $options: 'i' },
    });
  }

  // Filter By color
  if (req.query.color) {
    products = products.find({
      color: { $regex: req.query.color, $options: 'i' },
    });
  }

  // Filter By countryOfOrigin
  if (req.query.countryOfOrigin) {
    products = products.find({
      countryOfOrigin: { $regex: req.query.countryOfOrigin, $options: 'i' },
    });
  }

  // Filter By Price Range || Exact Price
  if (req.query.minPrice || (req.query.maxPrice && !req.query.price)) {
    const priceRange = {};
    if (req.query.minPrice) {
      priceRange.$gte = parseFloat(req.query.minPrice);
    }
    if (req.query.maxPrice) {
      priceRange.$lte = parseFloat(req.query.maxPrice);
    }
    products = products.find({
      price: priceRange,
    });

    // Getting by Exact Price
  } else {
    products = products.find({
      price: parseFloat(req.query.price),
    });
  }

  const productsToGet = await Product.find(products);

  if (productsToGet && productsToGet.length > 0) {
    return res.status(200).json({
      message: "Here's the list of all Products",
      products: productsToGet,
    });
  } else {
    return res.status(404).json({
      message: 'No products have been found',
      products: [],
    });
  }
};
