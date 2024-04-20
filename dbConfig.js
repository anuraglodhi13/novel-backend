const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.MONGODB_URI;
const prompt = require("./model/prompt");

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully!");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

const getPrompt = async () => {
  try {
    const promptModel = mongoose.model("prompt");
    const data = await promptModel.find({});
    return data;
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = { connectToMongo, getPrompt };
