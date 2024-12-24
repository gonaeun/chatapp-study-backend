const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();
const cors = require("cors");
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

mongoose  // 디비 연결
    .connect(process.env.DB)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.error("Database connection error:", err));

// 채팅방 만들기
// http://localhost:5002/ 사이트 접속하고 몽고db캠퍼스 열면 채팅방 생성된 것 확인 가능
const Room = require("./Models/room");
app.get("/", async (req,res)=>{
    await Room.deleteMany({});  // 기존 데이터 삭제 및 재삽입 (몽고db자체의 중복생성(=빈배열도 중복취급) 금지하는 문제 해결하기 위한 코드)
    await Room.insertMany([  // 데이터베이스에 데이터를 삽입하는 기능
        {
            room: "자바스크립트 단톡방",
            members: [],
        },
        {
            room: "리액트 단톡방",
            members: [],
        },
        {
            room: "NodeJS 단톡방",
            members: [],
        },
    ])
    .then(()=>res.send("ok"))
    .catch((error)=>res.send(error));
});

module.exports = app;