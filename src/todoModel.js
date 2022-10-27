const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add todo title'],
      minlength: [5, 'Minimal length is 5 charachters'],
      maxlength: [50, 'Maximal length is 50 charachters'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add short description'],
      maxlength: [200, 'Maximal length is 200 charachters'],
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'finished'],
      default: 'active',
    },
    deadline: {
      type: Date,
      required: [true, 'Please add deadline'],
      validate: {
        validator: function (input) {
          return input > Date.now();
        },
        message: 'Deadline must be in future...',
      },
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

todoSchema.virtual('timeleft').get(function () {
  return this.deadline - Date.now();
});

// todoSchema.pre(/^find/, function (next) {
//   this.populate({
//     select: '-__v',
//   });
//   next();
// });

todoSchema.methods.changeTimePassedStatus = async function () {
  if (this.timeleft <= 0) {
    await Todo.findByIdAndUpdate(this._id, {
      status: 'finished',
    });
  }
};

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
