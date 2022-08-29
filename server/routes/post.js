const router = require("express").Router();
const { like, unLike } = require("../controllers/postLikeAndUnLike");
const auth = require("../middleware/auth");

router.get("/:postId", require("../controllers/getPost"));
router.get("/comments/:postId", require("../controllers/getPostComments"));
router.get(
  "/:postId/comment/:commentId/replies",
  require("../controllers/getCommentReplies")
);
router.post("/like", like);
router.post("/unlike", unLike);

module.exports = router;
