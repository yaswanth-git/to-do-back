const express = require("express");
const mongodb = require("mongodb");

const server = express();

server.use(express.json());
server.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

let tasks;

const uri =
  "mongodb+srv://Yaswanth:123456%40abc@first-mongo.lo9x8.mongodb.net/ToDoList?retryWrites=true&w=majority";

const MongoClient = mongodb.MongoClient;

const app = async () => {
  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const dataBase = client.db("project");
    tasks = dataBase.collection("task-list");
  } catch (err) {
    console.log("error message.................." + err);
  }
};
app();

server.listen(process.env.PORT || 5000, () => {
  console.log("listening at 5000");
});

server.get("/", async (req, res) => {
  try {
    const data = await tasks.find();
    const arr = await data.toArray();
    res.json(arr);
  } catch (err) {
    console.log(err);
  }
});
server.post("/", async (req, res) => {
  try {
    await tasks.insertOne({ text: req.body.text });
    res.send("doc added successfully");
  } catch (err) {
    res.json(err);
  }
});
server.put("/", async (req, res) => {
  try {
    await tasks.updateOne(
      { _id: new mongodb.ObjectId(req.body.id) },
      { $set: { text: req.body.text } }
    );
    res.send(`updated successfully`);
  } catch (err) {
    res.json(err);
  }
});
server.delete("/", async (req, res) => {
  try {
    await tasks.deleteOne({ _id: new mongodb.ObjectId(req.body.id) });
    res.send("deleted the document");
  } catch (err) {
    res.json(err);
  }
});
