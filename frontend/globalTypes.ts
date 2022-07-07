export type Note = {
  _id: string;
  creatorId: string;
  content: object;
  contentPreview: string;
  title: string;
  tags: string[];
};

export type NotePreview = Omit<Note, 'content'>;

export type User = {
  token: string;
  userId: string;
  email: string;
};
