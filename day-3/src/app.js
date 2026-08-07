const express = require("express");
const authRouter = require("./routes/auth.routes")
const cookieParser = require("cookie-parser")

const app = express();

app.use(express.json());
app.use(cookieParser());
const dns = require("dns")

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])



app.use("/api/auth", authRouter)
module.exports = app;