const express = require('express');

const {
  getNoteById,
  getNotesByUserId,
  addNote,
  editNote,
  deleteNote,
} = require('../controllers/notes-controllers');

const router = express.Router();

router.get('/:id', getNoteById);
router.get('user/:id', getNotesByUserId);

router.post('/', addNote);

router.patch('/:id', editNote);

router.delete('/:id', deleteNote);

module.exports = router;
