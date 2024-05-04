const mongoose = require("mongoose");
const findOrCreate = require("findorcreate-promise");
const userSchema = new mongoose.Schema({
  userId: String,
  name: String,
  provider: String,
  plan: String,
  profilePicture: String,
});
userSchema.plugin(findOrCreate);
module.exports = mongoose.model("userModel", userSchema);
