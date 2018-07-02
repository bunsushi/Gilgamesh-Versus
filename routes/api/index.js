const router = require("express").Router();
const signupRoutes = require("./signup");
const signinRoutes = require("./signin");
const signoutRoutes = require("./signout");
const checkRoutes = require("./check");

// Define routes here
router.use("/signup", signupRoutes);
router.use("/signin", signinRoutes);
router.use("/signout", signoutRoutes);
router.use("/check", checkRoutes);

module.exports = router;
