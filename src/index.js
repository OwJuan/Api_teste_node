const express = require('express');

const mongoose = require('mongoose');

const http = require('http');
const socketIo = require('./routes');

const routes = require('./routes');

mongoose.connect('mongodb://locahost:27017/ezorders', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app = express();
const server = http.Server(app);
const io = socketIo(server);

app.use((request, response, next) => {
  request.io = io;
  next();
});

app.use(express.json());
app.use(routes);

server.listen(3001, () => console.log('> Server started at localhost: 3001'));
