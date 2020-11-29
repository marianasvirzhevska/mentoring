/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, Document, Model, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from '../interfaces';

export interface userModel extends User, Document {
  isValidPassword(): boolean;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre<userModel>('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);

  user.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password: string) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

export const UserModel: Model<userModel> = model<userModel>('User', userSchema);
