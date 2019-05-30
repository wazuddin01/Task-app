const express = require("express");
const router = express.Router();
const auth = require("../Authentication/auth");
const Task = require("../Models/Task");
const taskValidator = require("../Validation/task");
const jwt = require("jsonwebtoken");

//@route POST user/task
//@desc Create Task
//@access private
router.post("/task", auth, async (req, res) => {
  const { errors, isValid } = taskValidator(req.body);
  if (!isValid) {
    return res.status(400).json({ status: 0, data: {}, Errors: errors });
  }
  try {
    const { title, note } = req.body;
    //Get the token from headers
    const decode = jwt.decode(req.header("Authorization").split(" ")[1]);
    // Save the current task with userId
    const task = await new Task({ user: decode._id, title, note }).save();
    //await task.save();
    return res.status(200).json({ status: 1, data: task, Errors: {} });
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }
});

//@route GET user/task
//@desc Get Tasks of user
//@access private
router.get("/tasks", auth, async (req, res) => {
  try {
    //To Check the header is empty or not,if it's empty then send token value to empty string
    const token = req.header("Authorization").split(" ")[1];
    const decode = jwt.decode(token);
    //console.log(decode);
    const tasks = await Task.find({ user: decode._id });
    // console.log(tasks);
    if (!tasks) {
      throw new Error("No task Found");
    }
    return res.status(200).json(tasks);
  } catch (e) {
    // console.log(e);
    return res.status(401).json({ status: 0, data: {}, Error: e.message });
  }
});

//@route GET user/task/:id
//@desc Get single Task
//@access private
router.get("/task/:id", auth, async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const task = await Task.findById(id);
    if (!task) {
      throw new Error("Task Not Found");
    }
    return res.status(200).json({ status: 1, data: task, Error: {} });
  } catch (e) {
    //console.log(e);
    return res.status(404).json({ status: 0, data: {}, Error: e.message });
  }
});

//@route Delete user/task/:id
//@desc Delete single Task
//@access private
router.delete("/task/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndRemove(id);
    if (!task) {
      throw new Error("Task Not Found");
    }
    return res.status(200).json({
      status: 1,
      data: { message: "Successfully deleted Task" },
      Error: {}
    });
  } catch (e) {
    return res.status(404).json({ status: 0, data: {}, Error: e.message });
  }
});
module.exports = router;
