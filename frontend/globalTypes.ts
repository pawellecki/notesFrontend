import { Types } from 'mongoose';

export type Note = {
  title: string;
  tags: string[];
  creatorId: Types.ObjectId;
};
