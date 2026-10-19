const blacklistModel = require("../models/blacklist.model");
const usermModel = require("../models/user.model");
const redis = require("../config/cache");
const jwt = require("jsonwebtoken");


async function authUser(req, res, next) {
    const token = req.cookies.token;


    if (!token) {
        return res.status(401).json({
            message: "TOKEN NOT PROVIDED"
        });
    }
   const isBlacklisted = await redis.get(token);
    if (isBlacklisted) {
        return res.status(401).json({
            message: "TOKEN IS BLACKLISTED"
        });
    } 

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET
        )

        req.user = decoded;
        next();     

    } catch (error) {
        return res.status(401).json({
            message: "INVALID TOKEN"
        });
    }
}

module.exports = {authUser};


 