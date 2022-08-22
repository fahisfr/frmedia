const router = require("express").Router();
const { like, unLike } = require("../controllers/commentLikeAndUnLike");
const auth = require("../middleware/auth");

const comment = require("../controllers/commentLikeAndUnLike");
const reply = require("../controllers/replyLikeAndUnLike");
const getReplies = require("../controllers/getCommentReplies");


router.get("/", require("../controllers/getPost"));
router.post("/like", auth, like);
router.post("/unlike", auth, unLike);
router.get("/comment-replies",getReplies)
router.post("/comment-like",auth,comment.like)
router.post("/comment-unlike",auth,comment.unLike)
router.post("/reply-to-comment",auth,require("../controllers/replyToComment"))
router.post("/like-reply",auth,reply.like)
router.post("/unlike-reply",auth,reply.unLike)





module.exports = router;
