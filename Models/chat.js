const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    chat: String,
    user: {
      id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      name: String,
    },
    room: {  // 메세지 저장할때, 어느 채팅방에서 전달되고 있는 메세지인지 채팅방 정보도 저장해!
      type: mongoose.Schema.ObjectId,
      ref: "Room",
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Chat", chatSchema);