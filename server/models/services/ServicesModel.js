import { model, Schema } from 'mongoose';

const ServicesSchema = new Schema(
  {
    serviceName: {
      type: String,
      required: true,
    },
    serviceProvider: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'ServiceProvider',
    },
    images: {
      type: [String],
      required: true,
      default: ['../../assets/images/ArchiMatter.png'],
    },
    category: {
      type: String,
      required: true,
    },
    startingPrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    countryOfProvider: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service = model('Service', ServicesSchema);
export default Service;
