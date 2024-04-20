const mongoose = require("mongoose");

const promptSchema = mongoose.Schema({
  promptValue: String,
});

module.exports = mongoose.model("prompt", promptSchema);
