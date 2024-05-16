const mongoose = require("mongoose");

//Use mongoose-sequence Instead
const {autoIncrement}  = require("mongoose-plugin-autoinc");

// Create Object from mongoose Schema
const schema = new mongoose.Schema({
  fullName: { type: String, require: true },
  age: { type: Number, require: true },
  level: { type: String, enum: ['PreKG', 'KG1', 'KG2'], require: true },
  address: {
    city: { type: String, required: true },
    street: { type: String, required: true },
    building: { type: Number, required: true }},
});

schema.plugin(autoIncrement, {
model: "child", 
field: "_id",
startAt: 1, 
incrementBy: 1, 
});


// Mapping
module.exports = mongoose.model("child", schema);





