const express = require('express');

const {
  getNoteById,
  getNoteByUserId,
  addNote,
} = require('../controllers/notes-controllers');

const router = express.Router();

router.get('/:id', getNoteById);
router.get('user/:id', getNoteByUserId);

router.post('/', addNote);

module.exports = router;
