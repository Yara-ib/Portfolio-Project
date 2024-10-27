import { checkValidId } from '../helpers/checkValidId.js';
import { errorHelper } from '../helpers/errorHelper.js';
import Blogger from '../models/users/BloggersModel.js';
import ServiceProvider from '../models/users/ServiceProviderModel.js';
import User from '../models/users/UsersModel.js';

// Users Section
// ~ Users Management ~
// DELETE Method: Accessed By Admins Only for now
export const deleteAccount = async (req, res) => {
  if (req.params.id) {
    if (!checkValidId(req)) {
      return errorHelper(req, res, 'Please enter a valid Id', 400);
    } else {
      const accountToDelete = await User.findByIdAndDelete(req.params.id);
      if (accountToDelete) {
        console.log(`${accountToDelete.username} was successfully deleted!`);
        return res.status(200).json({
          message: `${accountToDelete.username} was successfully deleted!`,
        });
      } else {
        return errorHelper(req, res, 'No account matches that id!', 404);
      }
    }
  }
};

// PUT Method: To Update the Profile Page
// Protected Path: Must check permissions before accessing it
export const updateUserProfile = async (req, res) => {
  const { username, email } = req.body;

  if (req.params.id) {
    if (!checkValidId(req)) {
      return errorHelper(req, res, 'Please enter a valid id', 400);
    } else {
      if (!req.body || (!username && !email)) {
        return errorHelper(req, res, 'Missing Fields!', 400);
      }
    }
  }

  const profileToUpdate = await User.findByIdAndUpdate(
    req.params.id,
    {
      username,
      email,
    },
    {
      // To make sure the returned value is updated
      // because default for findByIdAndUpdate returns the old document
      new: true,
    }
  );

  if (profileToUpdate) {
    console.log(`Profile was successfully updated!`);
    return res.status(200).json({
      message: 'Profile was successfully updated!',
      profileToUpdate,
    });
  } else {
    return errorHelper(req, res, 'No Profile matches that id!', 404);
  }
};

// GET Method: To Access the Profile Page of Users
// Protected Path: Must check permissions before accessing it
export const getUserProfile = async (req, res) => {
  if (req.params.id) {
    if (!checkValidId(req)) {
      return errorHelper(req, res, 'Please enter a valid Id', 400);
    } else {
      const accountToView = await User.findById(req.params.id);
      if (accountToView) {
        console.log(`Admin checked ${accountToView.username}'s profile page`);
        return res.status(200).json({
          message: `This's ${accountToView.username} profile page!`,
          data: accountToView,
        });
      } else {
        return errorHelper(req, res, 'No account matches that id!', 404);
      }
    }
  }
};

// GET Method: List All Users
// Protected Path: Must check permissions before accessing it
export const getAllUsers = async (req, res) => {
  const listToView = await User.find();
  if (listToView) {
    return res.status(200).json({
      message: "Here's a list of all Users",
      data: listToView,
    });
  } else {
    return errorHelper(req, res, 'No users signed up yet!', 404);
  }
};

// Blog Section
// ~ Bloggers Management ~
// DELETE Method: Accessed By Admins Only for now
export const deleteBlogger = async (req, res) => {
  if (req.params.id) {
    if (!checkValidId(req)) {
      return errorHelper(req, res, 'Please enter a valid Id', 400);
    } else {
      const accountToDelete = await Blogger.findByIdAndDelete(req.params.id);
      if (accountToDelete) {
        console.log(`${accountToDelete.username} was successfully deleted!`);
        return res.status(200).json({
          message: `${accountToDelete.username} was successfully deleted!`,
        });
      } else {
        return errorHelper(req, res, 'No account matches that id!', 404);
      }
    }
  }
};

// PUT Method: To Update the Profile Page
// Protected Path: Must check permissions before accessing it
export const updateBlogger = async (req, res) => {
  const { username, email } = req.body;

  if (req.params.id) {
    if (!checkValidId(req)) {
      return errorHelper(req, res, 'Please enter a valid id', 400);
    } else {
      if (!req.body || (!username && !email)) {
        return errorHelper(req, res, 'Missing Fields!', 400);
      }
    }
  }

  const profileToUpdate = await Blogger.findByIdAndUpdate(
    req.params.id,
    {
      username,
      email,
    },
    {
      // To make sure the returned value is updated
      // because default for findByIdAndUpdate returns the old document
      new: true,
    }
  );

  if (profileToUpdate) {
    console.log(`Profile was successfully updated!`);
    return res.status(200).json({
      message: 'Profile was successfully updated!',
      profileToUpdate,
    });
  } else {
    return errorHelper(req, res, 'No Profile matches that id!', 404);
  }
};

// GET Method: To Access the Profile Page of Bloggers
// Protected Path: Must check permissions before accessing it
export const getBloggerProfile = async (req, res) => {
  if (req.params.id) {
    if (!checkValidId(req)) {
      return errorHelper(req, res, 'Please enter a valid Id', 400);
    } else {
      const accountToView = await Blogger.findById(req.params.id);
      console.log(accountToView);
      if (accountToView) {
        console.log(`Admin checked ${accountToView.username}'s profile page`);
        return res.status(200).json({
          message: `This's ${accountToView.username} profile page!`,
          data: accountToView,
        });
      } else {
        return errorHelper(req, res, 'No account matches that id!', 404);
      }
    }
  }
};

// GET Method: List All Bloggers
// Protected Path: Must check permissions before accessing it
export const getAllBloggers = async (req, res) => {
  const listToView = await Blogger.find();
  if (listToView) {
    return res.status(200).json({
      message: "Here's a list of all bloggers",
      data: listToView,
    });
  } else {
    return errorHelper(req, res, 'No bloggers signed up yet!', 404);
  }
};

// Services Section
// ~ Services Providers Management ~
// DELETE Method: Accessed By Admins Only for now
export const deleteServiceProvider = async (req, res) => {
  if (req.params.id) {
    if (!checkValidId(req)) {
      return errorHelper(req, res, 'Please enter a valid Id', 400);
    } else {
      const accountToDelete = await ServiceProvider.findByIdAndDelete(
        req.params.id
      );
      if (accountToDelete) {
        console.log(`${accountToDelete.username} was successfully deleted!`);
        return res.status(200).json({
          message: `${accountToDelete.username} was successfully deleted!`,
        });
      } else {
        return errorHelper(req, res, 'No account matches that id!', 404);
      }
    }
  }
};

// PUT Method: To Update the Profile Page
// Protected Path: Must check permissions before accessing it
export const updateSProvider = async (req, res) => {
  const { username, email } = req.body;

  if (req.params.id) {
    if (!checkValidId(req)) {
      return errorHelper(req, res, 'Please enter a valid id', 400);
    } else {
      if (!req.body || (!username && !email)) {
        return errorHelper(req, res, 'Missing Fields!', 400);
      }
    }
  }

  const profileToUpdate = await ServiceProvider.findByIdAndUpdate(
    req.params.id,
    {
      username,
      email,
    },
    {
      // To make sure the returned value is updated
      // because default for findByIdAndUpdate returns the old document
      new: true,
    }
  );

  if (profileToUpdate) {
    console.log(`Profile was successfully updated!`);
    return res.status(200).json({
      message: 'Profile was successfully updated!',
      profileToUpdate,
    });
  } else {
    return errorHelper(req, res, 'No Profile matches that id!', 404);
  }
};

// GET Method: To Access the Profile Page of Service Providers
// Protected Path: Must check permissions before accessing it
export const getSProviderProfile = async (req, res) => {
  if (req.params.id) {
    if (!checkValidId(req)) {
      return errorHelper(req, res, 'Please enter a valid Id', 400);
    } else {
      const accountToView = await ServiceProvider.findById(req.params.id);
      console.log(accountToView);
      if (accountToView) {
        console.log(`Admin checked ${accountToView.username}'s profile page`);
        return res.status(200).json({
          message: `This's ${accountToView.username} profile page!`,
          data: accountToView,
        });
      } else {
        return errorHelper(req, res, 'No account matches that id!', 404);
      }
    }
  }
};

// GET Method: List All Services Providers
// Protected Path: Must check permissions before accessing it
export const getAllSProviders = async (req, res) => {
  const listToView = await ServiceProvider.find();
  if (listToView) {
    return res.status(200).json({
      message: "Here's a list of all services providers",
      data: listToView,
    });
  } else {
    return errorHelper(req, res, 'No services providers signed up yet!', 404);
  }
};
