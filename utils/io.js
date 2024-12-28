const chatController = require("../Controllers/chat.controller");
const userController = require("../Controllers/user.controller");
const roomController = require("../Controllers/room.controller");

module.exports = function (io) {
    // io 관련된 모든 업무
    io.on("connection",async(socket)=>{
        // 듣는 함수 on
        // 연결된 사람의 정보를 매개변수 socket에 담아둠
        console.log("client is connected, socket ID:", socket.id);

        // 룸 리스트 보내기
        socket.emit("rooms", await roomController.getAllRooms());

        socket.on("login",async(userName,cb)=>{
                console.log("backend", userName);
            // 유저정보를 저장
            try{
                const user = await userController.saveUser(userName, socket.id);
                const welcomeMessage = {
                    chat: `${user.name} is joined to this room`,
                    user: {id : null, name: "system"},  // 백엔드에서 주는 메세지라서 id는 null
                };
                io.emit("message", welcomeMessage);
                cb({ok:true, data:user})
            }catch(error){
                cb({ok:false, error:error.message});
            }
        });

        socket.on("sendMessage",async(message,cb)=>{
            try{
                // socket id로 유저 찾기
                const user = await userController.checkUser(socket.id)
                // 메세지 저장(매개변수로 유저 전달)
                const newMessage = await chatController.saveChat(message,user)  // chat.js 통해서 chat,user 정보 필요한거 확인함
                io.emit("message", newMessage)
                cb({ok:true})
            }catch(error){
                cb({ok:false, error:error.message});
            }
        })

        socket.on("disconnect", ()=>{
            console.log("Client disconnected, socket ID:", socket.id);
        });
    })
}