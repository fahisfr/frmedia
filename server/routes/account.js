const { authRequied } = require("../middleware/auth");
const router = require("express").Router();
const upload = require("../config/multer");

router.get("/refreshtoken", require("../controllers/refreshToken"));
router.delete("/logout", authRequied, require("../controllers/logout"));
router.get("/", authRequied, require("../controllers/auth"));
router.post(
  "/edit-profile",
  authRequied,
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "coverPic", maxCount: 1 },
  ]),
  require("../controllers/editProfile")
);

module.exports = router;
