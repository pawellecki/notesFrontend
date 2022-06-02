const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Note = require('../models/note');

let mockNotes = [
  {
    id: '11',
    title: 'first note',
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

const addNote = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, check dataa', 422));
  }

  const { title, tags, creatorId } = req.body;
  console.log('req', req.body);
  const newNote = new Note({
    title,
    tags,
    //   image: { type: String, required: true },
    creatorId,
  });

  try {
    await newNote.save();
  } catch (err) {
    return next(new HttpError('Did not add new note', 500));
  }

  res.status(201).json({ note: newNote });
};

const editNote = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, check data', 422);
  }

  const { title, tags } = req.body;
  const { id } = req.params;

  const updatedNote = { ...mockNotes.find((note) => note.id === id) };
  const noteIndex = mockNotes.findIndex((note) => note.id === id);
  updatedNote.title = title;
  updatedNote.tags = tags;

  mockNotes[noteIndex] = updatedNote;

  res.status(201).json({ note: updatedNote });
};

const deleteNote = (req, res, next) => {
  const { id } = req.params;
  const deletedNote = mockNotes.find((note) => note.id === id);

  if (!deletedNote) {
    throw new HttpError('Could not find and delete this note', 422);
  }

  mockNotes = mockNotes.filter((note) => note.id !== id);

  res.status(200).json({ message: 'Delete success', id });
};

exports.getNoteById = getNoteById;
exports.getNotesByUserId = getNotesByUserId;
exports.addNote = addNote;
exports.editNote = editNote;
exports.deleteNote = deleteNote;
