import { Schema, Document, Model, model } from 'mongoose';
import { ChallengeState, StatusState } from '../constants';
import { Challenge } from '../interfaces';
import { AchvModel } from './achievement.model';

export interface ChallengeModel extends Challenge, Document {
  _id: string;
}

const challengeSchema: Schema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  state: {
    type: ChallengeState,
    required: true,
    default: StatusState.PENDING,
  },
  startDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  tasksOrder: [
    {
      name: String,
      values: Schema.Types.Mixed,
    },
  ],
  tasksStatus: [
    {
      name: String,
      values: Schema.Types.Mixed,
    },
  ],
  achievements: [
    {
      type: AchvModel,
    },
  ],
});

challengeSchema.methods.findChallenge = function (
  query: string,
): Promise<ChallengeModel> {
  return this.find(query);
};

challengeSchema.methods.updateChallenge = function (
  challengeId: string,
  document,
): Promise<ChallengeModel> {
  return this.updateOne({ id: challengeId }, { $set: document });
};

export const ChallengeModel: Model<ChallengeModel> = model<ChallengeModel>(
  'Challenge',
  challengeSchema,
);
