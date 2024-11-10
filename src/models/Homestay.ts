import mongoose, { Schema, Document } from 'mongoose';

export interface IHomestay extends Document {
  host_id: mongoose.Types.ObjectId;
  name: string;
  location: string;
  description: string;
  price_per_night: string;
  max_guests: string;
}

const HomestaySchema = new Schema<IHomestay>({
  host_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  price_per_night: { type: String, required: true },
  max_guests: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.model<IHomestay>('Homestay', HomestaySchema);

