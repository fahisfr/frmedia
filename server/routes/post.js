const router = require("express").Router();
const { like, unLike } = require("../controllers/commentLikeAndUnLike");
const auth = require("../middleware/auth");


router.get("/", require("../controllers/getPost"));
router.post("/like", auth, like);
router.post("/unlike", auth, unLike);





module.exports = router;
