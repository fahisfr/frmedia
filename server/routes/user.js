const router = require("express").Router();
const { follow, unFollow } = require("../controllers/followAndUnfollow");
const auth = require("../middleware/auth");

router.get( "/:userName/ff",require("../controllers/getUserFollowersAndFollowing"));
router.get("/:userName", require("../controllers/getProflieInfo"));
router.post("/follow", auth, follow);
router.post("/unfollow", auth, unFollow);

module.exports = router;
