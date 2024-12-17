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

module.exports = app