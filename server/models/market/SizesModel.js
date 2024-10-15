import { model, Schema } from 'mongoose';

const SizesSchema = new Schema({
  size: [
    {
      type: String,
      required: true,
    },
  ],
});

const Size = model('Size', SizesSchema);
export default Size;
