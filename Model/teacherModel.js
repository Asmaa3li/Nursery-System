const mongoose = require("mongoose");

// Create Object from mongoose Schema
const schema = new mongoose.Schema({
  fullName: { type: String, require: true },
  password: { type: String, require: true },
  email: { type: String, require: true },
  // Name of the image
  image: { type: String },
});

// Mapping
module.exports = mongoose.model("teacher", schema);
