import { Schema, Document, Model, model } from 'mongoose';
import { Task } from '../interfaces';

export interface taskDocument extends Omit<Task, '_id'>, Document {
  getTasks(): Promise<Task[]>;
}

export const taskSchema: Schema = new Schema({
  description: {
    type: String,
    required: true,
  },
});

taskSchema.methods.getTasks = function (): Promise<taskDocument[]> {
  return this.find({});
};

export interface taskModel extends Model<taskDocument> {
  getTasks(): Promise<taskDocument[]>;
}

export default model<taskDocument, taskModel>('task', taskSchema);
