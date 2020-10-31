import { StatusState } from '../constants';

export interface IStatus {
  state: StatusState;
  updated: Date;
}
