const router = require("express").Router();
const achievementsController = require("../../controllers/achievementsController");

// Matches with "/api/achievements"
router.route("/")
    .get(achievementsController.findAll)
    .post(achievementsController.create);

// Matches with "/api/achievements/:id"
router.route("/:id")
    .get(achievementsController.findById)
    .put(achievementsController.update)
    .delete(achievementsController.remove);

// Matches with "/api/achievements/user"
router.route("/user")
    .get(achievementsController.findById);

module.exports = router;
