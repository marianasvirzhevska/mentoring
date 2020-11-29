import { Schema, Document, Model, model } from 'mongoose';
import { Task } from '../interfaces';

export interface taskModel extends Task, Document {
  _id: string;
  getTasks(): Promise<Task[]>;
}

export const taskSchema: Schema = new Schema({
  description: {
    type: String,
    required: true,
  },
});

taskSchema.methods.getTasks = async function (): Promise<taskModel[]> {
  return await this.find({});
};

export const TaskModel: Model<taskModel> = model<taskModel>('Task', taskSchema);
