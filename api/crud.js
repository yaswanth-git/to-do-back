const express = require("express");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const server = express.Router();
const Tasks = require("../models/Tasks");
server.get("/", async (req, res) => {
  try {
    const data = await Tasks.find();
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});
server.post(
  "/",
  check("text", "text is required").not().isEmpty(),
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(401).json({ msg: error.array() });
      }
      const task = new Tasks({ text: req.body.text });
      await task.save();
      res.send("task added successfully");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);
server.put("/", async (req, res) => {
  try {
    await Tasks.updateOne(
      { _id: new mongoose.Types.ObjectId(req.body.id) },
      { $set: { text: req.body.text } }
    );
    res.send(`updated successfully`);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});
server.delete("/", async (req, res) => {
  try {
    await Tasks.deleteOne({ _id: new mongoose.Types.ObjectId(req.body.id) });
    res.send("deleted the document");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});
module.exports = server;
