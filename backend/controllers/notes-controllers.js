const { randomUUID } = require('crypto');
const HttpError = require('../models/http-error');

const mockNotes = [
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

const getNoteByUserId = (req, res, next) => {
  const userId = req.params.id;
  const note = mockNotes.find((note) => note.creatorId === userId);

  if (!note) {
    return next(new HttpError("User note doesn't exist", 404));
  }

  res.json({ note });
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

exports.getNoteById = getNoteById;
exports.getNoteByUserId = getNoteByUserId;
exports.addNote = addNote;
