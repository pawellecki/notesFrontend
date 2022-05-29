const { randomUUID } = require('crypto');
const HttpError = require('../models/http-error');

let mockNotes = [
  {
    id: '11',
    tags: ['js', 'node'],
    creatorId: 999,
  },
];

const getNoteById = (req, res, next) => {
  const noteId = req.params.id;
  const note = mockNotes.find((note) => note.id === noteId);

  if (!note) {
    throw new HttpError("Note doesn't exist", 404);
  }

  res.json({ note });
};

const getNotesByUserId = (req, res, next) => {
  const userId = req.params.id;
  const notes = mockNotes.filter((note) => note.creatorId == userId);

  if (!notes || notes.length === 0) {
    return next(new HttpError('Could not find any notes of this user', 404));
  }

  res.json({ notes });
};

const addNote = (req, res, next) => {
  const { title, tags } = req.body;

  const newNote = {
    id: randomUUID(),
    title,
    tags,
  };

  mockNotes.push(newNote);

  res.status(201).json(newNote);
};

const editNote = (req, res, next) => {
  const { tags } = req.body;
  const { id } = req.params;

  const updatedNote = { ...mockNotes.find((note) => note.id === id) };
  const noteIndex = mockNotes.findIndex((note) => note.id === id);
  updatedNote.tags = tags;

  mockNotes[noteIndex] = updatedNote;

  res.status(201).json({ note: updatedNote });
};

const deleteNote = (req, res, next) => {
  const { id } = req.params;

  mockNotes = mockNotes.filter((note) => note.id !== id);

  res.status(200).json({ message: 'Delete success', id });
};

exports.getNoteById = getNoteById;
exports.getNotesByUserId = getNotesByUserId;
exports.addNote = addNote;
exports.editNote = editNote;
exports.deleteNote = deleteNote;
