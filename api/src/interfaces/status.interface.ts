import { StatusState } from '../constants';

export interface Status {
  state: StatusState;
  updated?: Date;
}
