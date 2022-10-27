const express = require('express');
const todoRouter = require('./src/todoRouter');

const app = express();

app.use(express.json());

app.use('/api/todos', todoRouter);

module.exports = app;
