const express = require("express");
const connectDB = require("./config/index");
const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use(function (req, res, next) {
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

app.use("/", require("./api/crud"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running in port ${PORT}`));
