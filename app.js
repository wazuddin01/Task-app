const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const port = process.env.port || 3000;
const options = require("./config/keys");
//connecting to the database
mongoose
  .connect(options.mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => {
    console.log(`Error in connecting to database`, err);
  });

app.listen(port, () => {
  console.log(`App is Running at ${port}`);
});
