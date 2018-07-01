const router = require("express").Router();
const passport = require("passport");

// Matches with "/api/signin"
router.route("/")
    .get(function(req, res) {
        res.send("Route also working");
    })
    .post(passport.authenticate("local"), function(req, res) {
        res.json(true);
    });

module.exports = router;
