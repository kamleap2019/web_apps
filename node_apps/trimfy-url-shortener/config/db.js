const mongoose = require("mongoose");
const { mongoURI } = require("./keys");

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("MongoDB Connected....");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
