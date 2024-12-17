module.exports = function (io) {
    // io 관련된 모든 업무
    io.on("connection",async(socket)=>{
        // 듣는 함수 on
        // 연결된 사람의 정보를 매개변수 socket에 담아둠
        console.log("client is connected, socket ID:", socket.id);

    socket.on("disconnect", ()=>{
        console.log("Client disconnected, socket ID:", socket.id);
    });
    })
}