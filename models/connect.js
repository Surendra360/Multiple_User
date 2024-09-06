const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0/nib_login");
    console.log("connected to dataBase");
  } catch (error) {
    console.log(error);
  }
};
