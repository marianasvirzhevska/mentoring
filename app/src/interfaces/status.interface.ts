export enum StatusState {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export interface Status {
  state: StatusState;
  updated: Date;
}
