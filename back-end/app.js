const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const chalk = require("chalk");
const app = express();

const options = require("./config/keys");
const userRoute = require("./routes/user");
const taskRoute = require("./routes/task");
const adminRoute = require("./routes/admin");

const port = process.env.PORT || 3000;
// console.log(chalk.inverse.red("not found"));
// console.log(chalk.inverse.green('successfull'))
mongoose.set("useFindAndModify", false);
//connecting to the database
mongoose
  .connect(options.mongoUrl, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => {
    console.log(`Error in connecting to database`, err);
  });

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/user", taskRoute);
app.listen(port, () => {
  console.log(`App is Running at ${port}`);
});
