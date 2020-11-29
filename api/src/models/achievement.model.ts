import { Schema, Document, Model, model } from 'mongoose';
import { Achievement as IAchievement } from 'src/interfaces';

export interface achvDocument extends IAchievement, Document {
  _id: string;
  getAchievements(): Promise<IAchievement[]>;
}

/* export interface Achievement extends Model<AchvDocument> {
  comparePassword(password: string): boolean;
} */

/* export interface IUserModel extends Model<IUser> {
  hashPassword(password: string): string;
} */

export const achvSchema: Schema = new Schema({
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

/* achvSchema.methods.getAchievements = function (): Promise<achvDocument[]> {
  return this.find({});
}; */

achvSchema.method('getAchievements', function (): Promise<achvDocument[]> {
  return this.find({});
});

export const AchvModel: Model<achvDocument> = model<achvDocument>(
  'Achievement',
  achvSchema,
);

export default AchvModel;
