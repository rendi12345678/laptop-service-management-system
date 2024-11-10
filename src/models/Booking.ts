import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  user_id: mongoose.Types.ObjectId;
  homestay_id: mongoose.Types.ObjectId;
  start_date: Date;
  end_date: Date;
  total_price: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const BookingSchema = new Schema<IBooking>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  homestay_id: { type: Schema.Types.ObjectId, ref: 'Homestay', required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  total_price: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], required: true },
}, {
  timestamps: true,
});

export default mongoose.model<IBooking>('Booking', BookingSchema);
