import { Schema, Document, Model, model } from 'mongoose';
import { Achievement as IAchievement } from 'src/interfaces';

export interface achvDocument extends Omit<IAchievement, '_id'>, Document {
  getAchievements(): Promise<IAchievement[]>;
}

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

achvSchema.statics.getAchievements = function (): Promise<achvDocument[]> {
  return this.find({});
};

export interface achvModel extends Model<achvDocument> {
  getAchievements(): Promise<achvDocument[]>;
}

export default model<achvDocument, achvModel>('achievement', achvSchema);
