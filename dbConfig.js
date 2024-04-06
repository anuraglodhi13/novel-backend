const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://helloworld:helloworld@cluster0.1l7opit.mongodb.net/';

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
module.exports = connectToMongo;