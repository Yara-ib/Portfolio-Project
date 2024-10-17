import { errorHelper } from '../../helpers/errorHelper.js';
import Service from '../../models/services/ServicesModel.js';

// Need Checking service Provider is logged in first; handled in middlewares
export const addService = async (req, res) => {
  const {
    serviceName,
    serviceProvider,
    images,
    category,
    startingPrice,
    description,
    countryOfProvider,
  } = req.body;

  // Checking for missing fields
  if (
    !serviceName ||
    !serviceProvider ||
    !images ||
    !category ||
    !startingPrice ||
    !description ||
    !countryOfProvider
  ) {
    return errorHelper(req, res, 'Missing Fields!', 400);
  }

  // Creating the new Service
  const newService = new Service({
    serviceName,
    serviceProvider: req.authorizedId,
    images,
    category,
    startingPrice,
    description,
    countryOfProvider,
  });

  await newService.save();
  console.log(
    `${newService.serviceName}: ${newService.category} was added to the database!`
  );
  res.status(201).json({
    message: `${newService.serviceName}: ${newService.category} was added to the database!`,
    data: newService,
  });
};
