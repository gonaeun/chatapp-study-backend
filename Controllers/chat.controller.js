const chat = require("../Models/chat")
const chatController ={}

chatController.saveChat = async(message,user)=>{
    const newMessage = new chat({
        chat:message,
        user:{
            id:user._id,
            name:user.name
        },
        room: user.room, //메세지에 채팅방 정보도 저장하는 부분 추가가
    });
    await newMessage.save();
    return newMessage;
}

module.exports=chatController