import { checkValidId } from '../../helpers/checkValidId.js';
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

export const updateService = async (req, res) => {
  const {
    serviceName,
    serviceProvider,
    images,
    category,
    startingPrice,
    description,
    countryOfProvider,
  } = req.body;

  if (req.params.id) {
    if (!checkValidId(req)) {
      return errorHelper(req, res, 'Please enter a valid id', 400);
    } else {
      const serviceToUpdate = await Service.findByIdAndUpdate(
        req.params.id,
        {
          serviceName,
          serviceProvider,
          images,
          category,
          startingPrice,
          description,
          countryOfProvider,
        },
        {
          // To make sure the returned value is updated
          // because default for findByIdAndUpdate returns the old document
          new: true,
        }
      );
      if (serviceToUpdate) {
        console.log('Service was successfully updated!');
        return res.status(200).json({
          message: 'Service was successfully updated!',
          serviceToUpdate,
        });
      } else {
        return errorHelper(req, res, 'No service matches that id!', 404);
      }
    }
  }
};

export const getAllService = async (req, res) => {
  const services = await Service.find();
  const countServices = await Service.countDocuments();
  if (services && countServices > 0) {
    return res.status(200).json({
      message: "Here's the list of all services",
      services,
    });
  } else {
    return res.status(404).json({
      message: 'No services been found',
      services: [],
    });
  }
};

export const getService = async (req, res) => {
  if (req.params.id) {
    const service = await Service.findById(req.params.id);
    if (service) {
      return res.status(200).json({
        service,
      });
    } else {
      return errorHelper(req, res, "There's no such service", 404);
    }
  }
};
