const mongoose = require("mongoose");
const {autoIncrement}  = require("mongoose-plugin-autoinc");

// Create Object from mongoose Schema
const schema = new mongoose.Schema({
  name: { type: String, require: true },
  // datatype mongoose.type.object.id 
  supervisor: { type: mongoose.Types.ObjectId, ref: "teacher" },
  children: [{ type: Number, ref: "child" }],
});


  schema.plugin(autoIncrement, {
    model: "class", 
    field: "_id",
    startAt: 1, 
    incrementBy: 1, 
  });
  

// Mapping
module.exports = mongoose.model("class", schema);





