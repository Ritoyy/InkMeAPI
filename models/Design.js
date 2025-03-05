const mongoose = require("mongoose");

const designSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  isApproved: { type: Boolean, default: false },
  file: String,
  text: String,
  text_color: String,
});

module.exports = mongoose.model("Design", designSchema);
