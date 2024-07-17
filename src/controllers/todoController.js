const CustomError = require("../helpers/customError");
const { Todo } = require("../models/todoModel");
const mongoose = require("mongoose");
module.exports = {
  list: async (req, res) => {
    const todos = await Todo.find({});

    res.status(200).json({
      error: false,
      message: "Todos are listed!",
      result: todos,
    });
  },
  create: async (req, res) => {
    const { title, description, priority } = req.body;
    if (!title || !description) {
      throw new CustomError("Title and Description fields are mandatory!", 400);
    }
    if (priority) {
      if (!["low", "medium", "high", ""].some((item) => item === priority)) {
        throw new CustomError(
          "Priority should be one of 'low','medium','high' values!",
          400
        );
      }
    }

    const newTodo = await Todo.create(req.body);

    res.status(201).json({
      error: false,
      message: "A new todo is created!",
      result: newTodo,
    });
  },
  read: async (req, res) => {
    const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isIdValid) {
      throw new CustomError("Invalid Id type!", 400);
    }

    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      throw new CustomError("Todo not found!", 404);
    }
    res.status(200).json({
      error: false,
      message: "Your todo is here!",
      result: todo,
    });
  },
  update: async (req, res) => {
    const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isIdValid) {
      throw new CustomError("Invalid Id type!", 400);
    }

    const { title, description, priority } = req.body;
    if (!title || !description) {
      throw new CustomError("Title and Description fields are mandatory!", 400);
    }

    if (priority) {
        if (!["low", "medium", "high", ""].some((item) => item === priority)) {
          throw new CustomError(
            "Priority should be one of 'low','medium','high' values!",
            400
          );
        }
      }

    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      throw new CustomError("Todo not found!", 404);
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTodo) {
      throw new CustomError(
        "Could not be updated!! Somthing went wrong!!!",
        500
      );
    }

    res.status(202).json({
      error: false,
      message: "Selected todo is updated!",
      result: updatedTodo,
    });
  },
  updatePatch: async (req, res) => {
    const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isIdValid) {
      throw new CustomError("Invalid Id type!", 400);
    }

    const { title, description, priority, isDone } = req.body;
    if (!(title || description || priority || isDone)) {
      throw new CustomError(
        "At least one field is required for patch update!",
        400
      );
    }

    if (priority) {
        if (!["low", "medium", "high", ""].some((item) => item === priority)) {
          throw new CustomError(
            "Priority should be one of 'low','medium','high' values!",
            400
          );
        }
      }

    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      throw new CustomError("Todo not found!", 404);
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTodo) {
      throw new CustomError(
        "Could not be updated!! Somthing went wrong!!!",
        500
      );
    }

    res.status(202).json({
      error: false,
      message: "Selected todo is updated!",
      result: updatedTodo,
    });
  },
  delete: async (req, res) => {
    const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isIdValid) {
      throw new CustomError("Invalid Id type!", 400);
    }
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      throw new CustomError("Todo not found!", 404);
    }

    const { deletedCount } = await Todo.deleteOne({ _id: req.params.id });
    if (!deletedCount) {
      throw new CustomError(
        "Could not be deleted!! Somthing went wrong!!!",
        500
      );
    }
    res.sendStatus(204);
  },
};
