const router = require("express").Router();
const apiValidation = require("../middleware/apiValidation");
const {
  verifyEmail,
  verifyUserName,
} = require("../controllers/verifyNameAndEmail");




router.get("/user-name/:userName",verifyUserName);
router.get("/email/:emali",verifyEmail)


module.exports = router;
