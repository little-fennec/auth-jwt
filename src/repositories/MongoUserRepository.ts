import { UserRepository } from './UserRepository';
import { User } from '../entities/User';
import mongoose, { Schema, Document, Model } from 'mongoose';

interface UserDocument extends Document {
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);

export class MongoUserRepository implements UserRepository {
  async create(user: Omit<User, 'id'>): Promise<User> {
    const created = await UserModel.create(user);
    return { id: String(created._id), email: created.email, password: created.password };
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await UserModel.findOne({ email });
    if (!found) return null;
    return { id: String(found._id), email: found.email, password: found.password };
  }

  async findAll(): Promise<User[]> {
    const users = await UserModel.find();
    return users.map(u => ({ id: String(u._id), email: u.email, password: u.password }));
  }
} 