const router = require("express").Router();
const comment = require("../controllers/commentLikeAndUnLike");
const reply = require("../controllers/replyLikeAndUnLike");
const upload = require("../config/multer");

router.post("/like", comment.like);
router.post("/unlike", comment.unLike);
router.post("/add-reply", upload.single("file"), require("../controllers/addReply"));
router.post("/reply/like", reply.like);
router.post("/reply/unlike", reply.unLike);

module.exports = router;
