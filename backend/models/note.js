const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: { type: String, required: true },
  tags: { type: String, required: true },
  //   image: { type: String, required: true },
  creatorId: [{ type: String, required: true }],
});

module.exports = mongoose.model('Note', noteSchema);
