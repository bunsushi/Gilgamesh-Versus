const router = require("express").Router();

// Matches with "/api/signout"
router.route("/")
    .get(function(req, res) {
        res.send("You are signed out");
    });

module.exports = router;
