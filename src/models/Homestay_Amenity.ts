import mongoose, { Schema, Document } from 'mongoose';

export interface IHomestayAmenity extends Document {
  homestay_id: mongoose.Types.ObjectId;
  amenity_id: mongoose.Types.ObjectId;
}

const HomestayAmenitySchema = new Schema<IHomestayAmenity>({
  homestay_id: { type: Schema.Types.ObjectId, ref: 'Homestay', required: true },
  amenity_id: { type: Schema.Types.ObjectId, ref: 'Amenity', required: true },
}, {
  timestamps: true,
});

export default mongoose.model<IHomestayAmenity>('Homestay_Amenity', HomestayAmenitySchema);

