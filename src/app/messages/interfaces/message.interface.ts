import { User } from "./user.interface";

export interface Message {
  content?: string;
  subject?: string;
  from?: User[],
  to?: User[],
}
