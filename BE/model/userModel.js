import mongoose, { Schema, model } from "mongoose";
import MessageModel from "./messageModel.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    messages: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: MessageModel,
      },
    ],
    subscriptions: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
      },
    ],
  },
  { strict: false }
);

const User = model("User", userSchema);

export default User;
