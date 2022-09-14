const dbUser = require("../dbSchemas/user");

const getFollowersAndFollowing = async (req, res, next) => {
  try {
    const dbResutl = await dbUser.aggregate([
      {
        $match: {
          _id: objectId("62ff6f5c4cfc303b76427cb6"),
        },
      },
      {
        $project: {
          following: 1,
          followers: 1,
        },
      },
      {
        $unwind: {
          path: "$following",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          localField: "following",
          foreignField: "_id",
          from: "users",
          as: "following",
        },
      },
      {
        $unwind: {
          path: "$followers",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          localField: "followers",
          foreignField: "_id",
          from: "users",
          as: "followers",
        },
      },
    ]);

    if (dbResutl.length > 0) {
      return res.json({ status: "ok", info: dbResutl[0] });
    }

    res.json({ status: "error", error: "not found " });
  } catch (error) {
    next(error);
  }
};

module.exports = getFollowersAndFollowing;
