const router = require("express").Router();
const { follow, unFollow } = require("../controllers/followAndUnfollow");
const auth = require("../middleware/auth")

router.get("/:userName", require("../controllers/getUserInfo"));
router.post("/follow",auth, follow);
router.post("/unfollow",auth, unFollow);

module.exports = router;
