const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema(
    {
        room : String,  // 채팅방 이름
        members : [     // 방에 있는 멤버들 리스트
            {
                type: mongoose.Schema.ObjectId,
                // unique: true,  // 몽고db는 빈배열도 중복으로 간주함. 빈 채팅방을 여러개 설정하게 하고싶으면 코드 주석처리
                ref: "User",
            },
        ],
    },
    { timestamps : true }
);
module.exports = mongoose.model("Room", roomSchema);