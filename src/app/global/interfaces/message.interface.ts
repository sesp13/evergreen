import { User } from './user.interface';

export interface Message {
  id?: string;
  content?: string;
  subject?: string;
  from?: User[];
  to?: User[];
}