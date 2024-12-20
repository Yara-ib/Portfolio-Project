import { checkValidId } from '../../helpers/checkValidId.js';
import { errorHelper } from '../../helpers/errorHelper.js';
import Service from '../../models/services/ServicesModel.js';

// Need Checking service Provider is logged in first; handled in middlewares
export const addService = async (req, res) => {
  const {
    serviceName,
    images,
    category,
    startingPrice,
    description,
    countryOfProvider,
  } = req.body;

  // Checking for missing fields
  if (
    !serviceName ||
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
  let services = Service.find();

  // Filter By serviceProvider
  if (req.query.serviceProvider) {
    services = services.find({
      serviceProvider: { $regex: req.query.serviceProvider, $options: 'i' },
    });
  }

  // Filter By category
  if (req.query.category) {
    services = services.find({
      category: { $regex: req.query.category, $options: 'i' },
    });
  }

  // Filter By countryOfProvider
  if (req.query.countryOfProvider) {
    services = services.find({
      countryOfProvider: { $regex: req.query.countryOfProvider, $options: 'i' },
    });
  }

  const servicesToGet = await Service.find(services);

  if (servicesToGet && servicesToGet.length > 0) {
    return res.status(200).json({
      message: "Here's the list of all services",
      services: servicesToGet,
    });
  } else {
    return res.status(404).json({
      message: 'No services have been found',
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

// Only for Admins now, will be handled in another phase
//  to allow Service Providers to delete their own services
export const deleteService = async (req, res) => {
  if (req.params.id) {
    if (!checkValidId(req)) {
      return errorHelper(req, res, 'Please enter a valid id', 400);
    } else {
      const serviceToDelete = await Service.findByIdAndDelete(req.params.id);
      if (serviceToDelete) {
        console.log('Service was successfully deleted!');
        return res.status(200).json({
          message: 'Service was successfully deleted!',
        });
      } else {
        return errorHelper(req, res, 'No service matches that id!', 404);
      }
    }
  }
};
