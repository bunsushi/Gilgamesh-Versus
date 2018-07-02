const router = require("express").Router();

// Matches with "/api/check"
router.route("/")
    .get(function(req, res) {
        if (req.user) {
            res.json({ user: req.user });
        }
        else {
            res.json(false);
        }
    });

module.exports = router;
