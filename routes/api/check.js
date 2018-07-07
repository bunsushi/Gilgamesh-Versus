const router = require("express").Router();

// Matches with "/api/check"

// Gets user information from req object
router.route("/user")
    .get(function(req, res) {
        if (req.user) {
            res.json({ user: req.user });
        }
        else {
            res.json(false);
        }
    });

// Gets user authentication status
router.route("/auth")
    .get(isLoggedIn, function(req, res) {
        res.json(true);
    });

// Function to verify the user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.json(false);
    }
};

module.exports = router;
