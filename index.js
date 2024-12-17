const {createServer} = require("http");
const app = require("./app");
const {Server} = require("socket.io");
require("dotenv").config();

const httpServer = createServer(app);

const io = new Server(httpServer,{    // 웹소켓 서버
    cors:{
        origin:"http://localhost:3000"
    }
})

require("./utils/io")(io);

// 서버 시작
const PORT = process.env.PORT || 5002;
httpServer.listen(process.env.PORT,()=>{
    console.log("server listening on port", process.env.PORT);
});