import { connectToDatabase } from './dbConnect';
import User from '../models/User';

export const getUserByEmail = async (email: string) => {
  await connectToDatabase();
  return User.findOne({ email });
};

export const createUser = async (userData: { name: string; email: string; image: string; role: string }) => {
  await connectToDatabase();
  const newUser = new User(userData);
  await newUser.save();
  return newUser;
};
