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

        // 로그인
        socket.on("login",async(userName,cb)=>{
                console.log("backend", userName);
            // 유저정보를 저장
            try{
                const user = await userController.saveUser(userName, socket.id);
                // 채팅방에 들어가야 웰컴메세지 보여줄것이기 때문에, 밑의 코드는 주석처리리
                // const welcomeMessage = {
                //     chat: `${user.name} is joined to this room`,
                //     user: {id : null, name: "system"},  // 백엔드에서 주는 메세지라서 id는 null
                // };
                // io.emit("message", welcomeMessage);
                cb({ok:true, data:user})
            }catch(error){
                cb({ok:false, error:error.message});
            }
        });

        // 방 참여
        socket.on("joinRoom", async (roomId, cb) => {
            try{
                const user = await userController.checkUser(socket.id); // 1. 일단 유저정보 들고오기
                await roomController.joinRoom(roomId, user); // 2. room데이터의 member필드에 해당 유저 추가하고, user데이터의 room필드에 유저가 조인한 room정보 업데이트
                socket.join(user.room.toString()); // 3. socket은 해당room id로 된 채널에 join
                const welcomeMessage = {
                    chat: `${user.name} is joined to this room`,
                    user: { id: null, name: "system" },
                };
                console.log("Sending welcome message to room:", roomId, welcomeMessage); // 디버깅 로그 추가
                io.to(user.room.toString()).emit("message", welcomeMessage); // 4. 방에 메세지 전송송
                io.emit("rooms", await roomController.getAllRooms()); // 5. 모든 방 업데이트
                cb({ok: true});
            } catch (error) {
                cb({ok: false, error:error.message});
            }
        });

        // 메세지 전송
        socket.on("sendMessage",async(message,cb)=>{
            try{
                // socket id로 유저 찾기
                const user = await userController.checkUser(socket.id)
                // 메세지 저장(매개변수로 유저 전달)
                const newMessage = await chatController.saveChat(message,user)  // chat.js 통해서 chat,user 정보 필요한거 확인함
                io.to(user.room.toString()).emit("message", newMessage) // 다른채팅방에는 채팅내용이 안보이도록 해당채팅방 소켓들에게만 말하기
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