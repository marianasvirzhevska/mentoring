import { Schema, Document, Model, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from '../interfaces';

export interface userDocument extends User, Document {
  isValidPassword(password: string): boolean;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre<userDocument>('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password: string) {
  const compare = await bcrypt.compare(password, this.password);

  return compare;
};

export interface userModel extends Model<userDocument> {
  getTasks(): Promise<userDocument[]>;
}

export default model<userDocument, userModel>('user', userSchema);
