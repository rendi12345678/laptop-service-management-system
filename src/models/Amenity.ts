import mongoose, { Schema, Document } from 'mongoose';

export interface IAmenity extends Document {
  name: string;
  description: string;
}

const AmenitySchema = new Schema<IAmenity>({
  name: { type: String, required: true },
  description: { type: String },
}, {
  timestamps: true,
});

export default mongoose.model<IAmenity>('Amenity', AmenitySchema);

