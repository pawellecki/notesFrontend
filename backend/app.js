const express = require('express');
const bodyParser = require('body-parser');

const notesRoutes = require('./routes/notes-routes');

const app = express();

app.use('/api/notes', notesRoutes);

app.use((error, req, res, next) => {
  //respons sent
  if (res.headerSent) {
    return next(error);
  }

  return res
    .status(error.code || 500)
    .json({ message: error.message || 'Unknown error' });
});

app.listen(5000);
