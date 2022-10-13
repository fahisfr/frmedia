const router = require("express").Router();

const notif = require("../controllers/getNotificationMentions");

router.get("", require("../controllers/getAllNotifications"));
router.get("/post/:postId", notif.getPost);
router.get("/mentions", require("../controllers/getMentions"));

module.exports = router;
