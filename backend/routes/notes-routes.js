const express = require('express');
const { check } = require('express-validator');

const {
  getNoteById,
  getNotesByUserId,
  addNote,
  editNote,
  deleteNote,
} = require('../controllers/notes-controllers');

const router = express.Router();

router.get('/:id', getNoteById);
router.get('/user/:id', getNotesByUserId);

router.post(
  '/',
  [check('title').not().isEmpty(), check('tags').isLength({ min: 1 })],
  addNote
);

router.patch(
  '/:id',
  [check('title').not().isEmpty(), check('tags').isLength({ min: 1 })],
  editNote
);

router.delete('/:id', deleteNote);

module.exports = router;
