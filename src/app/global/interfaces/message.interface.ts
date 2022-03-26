import { User } from "./user.interface";

export interface Message {
  subject?: string;
  content?: string;
  sender?: string;
  senderObject?: User;
  receivers?: string[];
  receiversObjects?: User[];
  status?: string;
  id?: string;
}
