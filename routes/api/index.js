const router = require("express").Router();
const signupRoutes = require("./signup");
const signinRoutes = require("./signin");

// Define routes here
router.use("/signup", signupRoutes);
router.use("/signin", signinRoutes);

module.exports = router;
