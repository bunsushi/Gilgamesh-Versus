const router = require("express").Router();

// Matches with "/api/signup"
router.route("/")
    .get(function(req, res) {
        res.send("Route working");
    });

module.exports = router;
