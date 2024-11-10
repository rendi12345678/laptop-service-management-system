import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  user_type: 'guest' | 'host';
  phone_number: number;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  user_type: { type: String, enum: ['guest', 'host'], required: true },
  phone_number: { type: Number, required: true },
}, {
  timestamps: true,
});

export default mongoose.model<IUser>('User', UserSchema);

