export interface IUser {
  userId: string;
}

export interface AuthRequest extends Request {
  user?: IUser;
}
