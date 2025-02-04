const app = require("./app");

const mongoose = require("mongoose");

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3001);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
