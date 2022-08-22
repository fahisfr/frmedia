const router = require("express").Router();
const comment = require("../controllers/commentLikeAndUnLike");
const reply = require("../controllers/replyLikeAndUnLike");
const getReplies = require("../controllers/getCommentReplies");
const auth = require("../middleware/auth")

router.get("/:commentId/replies",getReplies);
router.post("/like", comment.like);
router.post("/unlike", comment.unLike);
router.post("/add-reply",auth, require("../controllers/replyToComment"));
router.post("/like-reply",auth, reply.like);
router.post("/unlike-reply",auth, reply.unLike);

module.exports = router;
