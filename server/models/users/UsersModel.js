import { Schema, model } from 'mongoose';

const ShippingAddressSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
});

const UsersSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 4,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: '../assets/images/profilePic.png',
    },
    shippingAddress: {
      type: ShippingAddressSchema,
      required: true,
    },
    adminOrNot: {
      type: Boolean,
      default: false,
    },
    bannedOrNot: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model('User', UsersSchema);
export default User;
