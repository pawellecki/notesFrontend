const express = require('express');
const bodyParser = require('body-parser');

const notesRoutes = require('./routes/notes-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/notes', notesRoutes);

app.use((req, res, next) => {
  throw new HttpError('Could not find this route :(', 404);
});

app.use((error, req, res, next) => {
  //respons sent
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || 'Unknown error' });
});

app.listen(5000);
