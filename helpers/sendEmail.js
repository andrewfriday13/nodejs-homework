const sgEmail = require("@sendgrid/mail");
require("dotenv").config();

const { GRID_API_KEY } = process.env;

sgEmail.setApiKey(GRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "andrymazur96@gmail.com" };
  await sgEmail.send(email);
  return true;
};
module.exports = sendEmail;
