const express = require("express");




const app = express()

app.use(express.json());
// const router = require("./routes/routes");
// app.use(router);
app.post("/", (req, res) => {
    res.send("hello")
})




module.exports = app;