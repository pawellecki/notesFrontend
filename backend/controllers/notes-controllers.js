const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Note = require('../models/note');

const getNoteById = async (req, res, next) => {
  const noteId = req.params.id;

  let note;

  try {
    note = await Note.findById(noteId);
  } catch (err) {
    return next(new HttpError('Could not find note', 500));
  }

  if (!note) {
    return next(new HttpError("Note doesn't exist", 404));
  }

  res.json({ note });
};

const getNotesByUserId = async (req, res, next) => {
  const userId = req.params.id;

  let notes;

  try {
    notes = await Note.find({ creatorId: userId });
  } catch (err) {
    return next(new HttpError('Could not fetch notes', 500));
  }

  if (!notes || notes.length === 0) {
    return next(new HttpError('Could not find any notes of this user', 404));
  }

  res.json({ notes: notes.map((note) => note.toObject({ getters: true })) });
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

const editNote = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, check data', 422));
  }

  const { title, tags } = req.body;
  const { id } = req.params;

  let note;

  try {
    note = await Note.findById(id);
  } catch (err) {
    return next(new HttpError('Edit failed, could not find note', 500));
  }

  note.title = title;
  note.tags = tags;

  try {
    await note.save();
  } catch (err) {
    return next(new HttpError('Edit failed, could not save changes', 500));
  }

  res.status(201).json({ note: note.toObject({ getters: true }) });
};

const deleteNote = async (req, res, next) => {
  const { id } = req.params;
  let note;

  try {
    note = await Note.findById(id);
  } catch (err) {
    return next(new HttpError('Could not find and delete this note', 422));
  }

  try {
    await note.remove();
  } catch (err) {
    return next(new HttpError('Could not delete this note', 422));
  }

  res.status(200).json({ message: 'Delete success', id });
};

exports.getNoteById = getNoteById;
exports.getNotesByUserId = getNotesByUserId;
exports.addNote = addNote;
exports.editNote = editNote;
exports.deleteNote = deleteNote;
