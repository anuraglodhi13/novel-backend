const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId: String,
    name: String,
    provider: String,
});
module.exports = mongoose.model('userModel',userSchema);