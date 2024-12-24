const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must type name"],
    unique: true,
  },
  token: {
    type: String,
  },
  online: {
    type: Boolean,
    default: false,
  },
  room: {  // 유저에 대해 저장할때 어떤 채팅방에 들어있는지 정보도 저장해!
    type: mongoose.Schema.ObjectId,
    ref: "Room",
  },
});

module.exports = mongoose.model("User", userSchema);
