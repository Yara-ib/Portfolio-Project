import { Schema, model } from 'mongoose';

const ServiceProviderSchema = new Schema(
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
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    biography: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: '../assets/images/profilePic.png',
    },
    servicesOffered: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Service',
      },
    ],
    bannedOrNot: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ServiceProvider = model('ServiceProvider', ServiceProviderSchema);
export default ServiceProvider;
