const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [emailRegexp, "Invalid email address"],
    },
    password: {
      type: String,
      required: true,
      minlngth: 6,
    },
    token: {
      type: String,
      required: true,
      default: " ",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("User", userSchema);

module.exports = {
  User,
};
