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
    return next(new HttpError("Note doesn't exist", 404));
  }

  res.json({ note });
};

const getNoteByUserId = (req, res, next) => {
  const userId = req.params.id;
  const note = mockNotes.find((note) => note.creatorId === userId);

  if (!note) {
    return next(new HttpError("Note doesn't exist", 404));
  }

  res.json({ note });
};

exports.getNoteById = getNoteById;
exports.getNoteByUserId = getNoteByUserId;
