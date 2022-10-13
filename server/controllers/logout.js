const dbUser = require("../dbSchemas/user");

const logout = async (req, res, next) => {
  try {
 
    const dbResult = await dbUser.updateOne(
      { _id: req.user?.id },
      { $unset: { refreshToken: true } }
    );
    res.clearCookie("auth_token");
    res.json({ status: "ok" });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
