const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 200,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 200,
      required: true,
    },
    priority: {
      type: String,
      enum: {
        values: ["low", "medium", "high"],
        message: "Priority must be low, medium, high!",
      },
      default: "medium",
    },
    isDone:{
        type:Boolean,
        default:false,
    }
  },
  {
    collection: "todos",
    timestamps: true,
  }
);

todoSchema.set('toJSON',{
  transform: (doc,ret)=>{
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

  }
})

module.exports.Todo = model("Todo", todoSchema);
