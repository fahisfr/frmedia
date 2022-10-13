const { route } = require("./post");
const { auth, authRequied } = require("../middleware/auth");
const router = require("express").Router();

router.get("/refreshtoken", require("../controllers/reAuth"));
router.delete("/logout", authRequied, require("../controllers/logout"));
router.get("/", authRequied, require("../controllers/auth"));
router.post(
  "/edit-profile",
  authRequied,
  require("../controllers/editProfile")
);

module.exports = router;
