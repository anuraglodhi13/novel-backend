const mongoose = require('mongoose');
const findOrCreate = require('findorcreate-promise');
const userSchema = mongoose.Schema({
    userId: String,
    name: String,
    provider: String,
});
userSchema.plugin(findOrCreate);
module.exports = mongoose.model('userModel',userSchema);