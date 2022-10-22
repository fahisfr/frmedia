const router = require("express").Router();

router.get("", require("../controllers/getAllNotifications"));
router.get("/mentions", require("../controllers/getMentions"));

module.exports = router;
