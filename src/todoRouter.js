const express = require('express');
const todoController = require('./todoController');
const router = express.Router();

router.use(todoController.checkStatus);

router.route('/').get(todoController.getTodos).post(todoController.createTodo);

router
  .route('/:id')
  .get(todoController.getTodo)
  .patch(todoController.updateTodo)
  .delete(todoController.deleteTodo);

router.route('/complete/:id').patch(todoController.completeTodo);

module.exports = router;
