import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'admin' | 'user';
  image: string;
}

// Define the User schema
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'user'], required: true },
  image: { type: String, required: true },
}, {
  timestamps: true,
});

// Avoid overwriting the model if it's already compiled
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
