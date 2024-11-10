import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  booking_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  homestay_id: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
}

const ReviewSchema = new Schema<IReview>({
  booking_id: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  homestay_id: { type: Schema.Types.ObjectId, ref: 'Homestay', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
}, {
  timestamps: true,
});

export default mongoose.model<IReview>('Review', ReviewSchema);

