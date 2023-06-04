const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;
const { User } = require("../models/user");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../utils");

const avatarPath = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "User already exists");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatar = gravatar.url(email);

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL: avatar });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw HttpError(401, "Invalid credentials");
  }
  const { _id: id } = user;
  const payload = {
    id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
  await User.findByIdAndUpdate(id, { token });

  res.status(200).json({
    token,
  });
};

const getCurrentUser = async (req, res) => {
  const { email, name } = req.user;
  res.json({ email, name });
};

const logOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({
    message: "User logged",
  });
};
const updateAvatar = async (req, res) => {
  const { _id: id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const fileName = `${id}_${originalname}`;
  const resultUpload = path.join(avatarPath, fileName);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(id, { avatarURL });
  res.json({
    avatarURL,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logOut: ctrlWrapper(logOut),
  updateAvatar: ctrlWrapper(updateAvatar),
};
