import { Schema, Document, Model, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from '../interfaces';
import { SALT_ROUNDS } from '../constants';

export interface userDocument extends User, Document {
  isValidPassword(password: string): boolean;
  update;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  challengeId: { type: Types.ObjectId, required: false },
});

userSchema.pre<userDocument>('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  bcrypt
    .hash(user.password, SALT_ROUNDS)
    .then(function (hash) {
      user.password = hash;
      next();
    })
    .catch((error) => next(error));
});

userSchema.methods.isValidPassword = async function (password: string) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

userSchema.methods.updateOne = function (userId, document_) {
  return this.updateOne(
    { _id: new Types.ObjectId(userId) },
    { $set: document_ },
  ).then((user) => console.log(user));
};

export interface userModel extends Model<userDocument> {
  getTasks(): Promise<userDocument[]>;
}

export default model<userDocument, userModel>('user', userSchema);
