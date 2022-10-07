const router = require("express").Router();

const notif = require("../controllers/getNotificationMentions");

router.get("/post/:postId", notif.getPost);
router.get("/post/:postId/comment/:commentId", notif.getPostAndComment);
router.get(
  "/post/:postId/comment/:commentId/reply/:replyId",
  notif.getCommentAndReply
);

module.exports = router;
