const dbUser = require("../dbSchemas/user");
const dbPost = require("../dbSchemas/post");

const search = async (req, res, next) => {
  try {
    const { text } = req.params;

    const dbResult = await dbUser.find(
      { userName: { $regex: text } },
      { userName: 1, profilePic: 1,verified:1 }
    );

    dbResult
      ? res.json({ status: "ok", result: dbResult })
      : res.json({ status: "error", error: "not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = search;
