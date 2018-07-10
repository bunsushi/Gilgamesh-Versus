const router = require("express").Router();
const signupRoutes = require("./signup");
const signinRoutes = require("./signin");
const signoutRoutes = require("./signout");
const checkRoutes = require("./check");
const achievementRoutes = require("./achievements");

// Define routes here
router.use("/signup", signupRoutes);
router.use("/signin", signinRoutes);
router.use("/signout", signoutRoutes);
router.use("/check", checkRoutes);
router.use("/achievements", achievementRoutes);

module.exports = router;
