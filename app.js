const express = require('express');
const cors = require('cors');
const todoRouter = require('./src/todoRouter');

const app = express();

app.use(express.json());

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use('/api/todos', todoRouter);

module.exports = app;
