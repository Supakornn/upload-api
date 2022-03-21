const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  name: {
    type: "string",
    require: true
  },
  info: {
    type: "string",
    require: true
  },
  img: {
    type: "string",
    require: true
  }
});

module.exports = mongoose.model("File", FileSchema);
