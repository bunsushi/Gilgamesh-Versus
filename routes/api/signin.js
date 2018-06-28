const router = require("express").Router();

// Matches with "/api/signin"
router.route("/")
    .get(function(req, res) {
        res.send("Route also working");
    });

module.exports = router;
