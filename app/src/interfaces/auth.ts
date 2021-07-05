export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

export interface UserInfo extends Pick<User, 'email'> {
  _id: string;
}
