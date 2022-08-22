const dbUser = require("../dbSchemas/user");

const verifyUserName = async (req, res, next) => {
  try {
    const { userName } = req.params;

    const user = await dbUser.findOne({ userName });

    if (user) {
      res.json({
        success: false,
        approved: false,
        message: " Username already registered ",
      });
    }
    res.json({
      success: true,
      approved: true,
      message: "User name is available",
    });
  } catch (error) {
    next();
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await dbUser.findOne({ email });

    if (user) {
      res.json({ status: "error", error: " Email already registered " });
      return;
    }
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = { verifyUserName, verifyEmail };
