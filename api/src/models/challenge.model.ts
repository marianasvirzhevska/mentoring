import { Schema, Document, Model, model, Types } from 'mongoose';
import { ChallengeState, StatusState } from '../constants';
import { Challenge } from '../interfaces';

export interface ChallengeDocument extends Omit<Challenge, '_id'>, Document {}

const challengeSchema: Schema = new Schema({
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
  tasksOrder: {
    type: Map,
    of: Schema.Types.Mixed,
  },
  tasksStatus: {
    type: Map,
    of: Schema.Types.Mixed,
  },
  achievements: [
    {
      type: Schema.Types.Mixed,
    },
  ],
  achievementsStatus: {
    type: Map,
    of: Schema.Types.Mixed,
  },
});

challengeSchema.methods.findChallenge = function (
  query: string,
): Promise<ChallengeDocument> {
  return this.find(query);
};

challengeSchema.methods.updateChallenge = function (
  _id: string,
  document,
): Promise<ChallengeDocument> {
  return this.updateOne({ _id: new Types.ObjectId(_id) }, { $set: document });
};

export interface challengeModel extends Model<ChallengeDocument> {
  findChallenge(): Promise<ChallengeDocument>;
  updateChallenge(): Promise<ChallengeDocument>;
}

export default model<ChallengeDocument, challengeModel>(
  'challenge',
  challengeSchema,
);
