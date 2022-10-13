const router = require("express").Router();
const { follow, unFollow } = require("../controllers/followAndUnfollow");
const { auth, authRequied } = require("../middleware/auth");

router.get("/:userName", auth, require("../controllers/getProflieInfo"));
router.post("/follow", authRequied, follow);
router.post("/unfollow", authRequied, unFollow);
router.get(
  "/:userName/ff",
  authRequied,
  require("../controllers/getUserFollowersAndFollowing")
);

module.exports = router;
