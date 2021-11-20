const mongoose = require("mongoose");
const config = require("config");
const connectDB = async () => {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
    });
    console.log("mongodb connected .......");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
module.exports = connectDB;
