const router = require("express").Router();
const signupRoutes = require("./signup");

// Define routes here
router.use("/signup", signupRoutes);

module.exports = router;
