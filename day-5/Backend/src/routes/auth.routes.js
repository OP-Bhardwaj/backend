const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middlewares/auth.middleware");
const authController = require("../controllers/auth.controller");



router.post("/register", authController.registerUser );

router.post("/login", authController.loginUser );   

router.get("/getMe", authMiddleware.authUser, authController.getMe );

module.exports = router;