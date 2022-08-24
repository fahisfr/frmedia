const dbUser = require("../dbSchemas/user");

const verifyUserName = async (req, res, next) => {
  try {
    const { userName } = req.params;

    const user = await dbUser.findOne({ userName });

    if (user) {
      res.json({
        
        status:"error",
        error: " Username already registered ",
      });
    }
    res.json({
      status:"ok",
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
