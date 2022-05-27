const express = require('express');

const {
  getNoteById,
  getNoteByUserId,
} = require('../controllers/notes-controllers');

const router = express.Router();

router.get('/:id', getNoteById);
router.get('user/:id', getNoteByUserId);

module.exports = router;
