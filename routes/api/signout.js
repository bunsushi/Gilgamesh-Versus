const router = require("express").Router();

// Matches with "/api/signout"
router.route("/")
    .get(function(req, res) {
        req.logout(); // May need to change to req.session.destroy()
        res.json(true);
    });

module.exports = router;
