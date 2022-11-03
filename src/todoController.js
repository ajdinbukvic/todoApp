const Todo = require('./todoModel');

const updateFinishedTodos = todos => {
  todos.forEach(async todo => {
    try {
      await todo.changeTimePassedStatus();
    } catch (err) {
      throw err;
    }
  });
};

exports.checkStatus = async (req, res, next) => {
  try {
    const todos = await Todo.find({ status: 'active' });
    if (!todos) return next();
    updateFinishedTodos(todos);
    next();
  } catch (err) {
    throw err;
  }
};

exports.getTodos = async (req, res) => {
  try {
    let sortBy = req.query.sort;
    let filterBy = req.query.filter;
    let query, todos;
    if (sortBy === 'oldest') {
      if (filterBy === 'all') todos = await Todo.find();
      else todos = await Todo.find({ status: filterBy });
    } else if (sortBy === 'newest') {
      if (filterBy === 'all') query = await Todo.find();
      else query = await Todo.find({ status: filterBy });
      todos = await (await query).reverse();
    }

    res.status(200).json({
      status: 'success',
      results: todos.length,
      data: {
        todos,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        todo,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const newTodo = await Todo.create({ title, description, deadline });
    res.status(201).json({
      status: 'success',
      data: {
        todo: newTodo,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, deadline },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: {
        todo,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.completeTodo = async (req, res) => {
  try {
    const todoCheck = await Todo.findById(req.params.id);
    if (todoCheck.status === 'active') {
      const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        {
          status: 'completed',
        },
        { new: true }
      );
      res.status(200).json({
        status: 'success',
        data: {
          todo,
        },
      });
    } else {
      throw new Error('You can complete only active todo');
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTodosCount = async (req, res) => {
  try {
    const statusCount = await Todo.aggregate([
      {
        $group: {
          _id: '$status',
          countNum: { $sum: 1 },
        },
      },
    ]);
    console.log(statusCount);
    res.status(200).json({
      status: 'success',
      data: {
        statusCount,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
