const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const notesRoutes = require('./routes/notes-routes');
const usersRoutes = require('./routes/users-routes');

const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/notes', notesRoutes);
app.use('/api/users', usersRoutes);

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

const databaseConnectionString =
  'mongodb+srv://mstdnt:3aARLDDf9byotZe4@cluster0.hqats.mongodb.net/nextNotes?retryWrites=true&w=majority';
mongoose
  .connect(databaseConnectionString)
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
