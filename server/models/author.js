const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: String,
    age: String,
})

module.exports = mongoose.model("Authors", authorSchema);