const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])
async function connectDB() {

    await mongoose.connect("mongodb+srv://yt:nSKJoPD3o8PndS4j@cluster1.hbidjim.mongodb.net/halley")

    console.log("Connected to DB");
    
}

module.exports = connectDB

