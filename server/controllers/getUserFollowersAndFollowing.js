const dbUser = require("../dbSchemas/user");
const objectId = require("mongoose").Types.ObjectId;
const { DB_PROJECT_USERINFO } = require("./helper");

const getFollowersAndFollowing = async (req, res, next) => {
  try {
    const { userName } = req.params;
    const id = req.user?.id;

    const dbResult = await dbUser.aggregate([
      {
        $match: {
          userName,
        },
      },
      {
        $set: {
          userId: objectId(id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },

      {
        $set: {
          userInfo: {
            $arrayElemAt: ["$userInfo", 0],
          },
        },
      },
      {
        $project: {
          following: 1,
          followers: 1,
          userFollowing: "$userInfo.following",
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
          from: "users",
          localField: "following",
          foreignField: "publicID",
          as: "following",
        },
      },
      {
        $set: {
          following: {
            $arrayElemAt: ["$following", 0],
          },
        },
      },
      {
        $project: {
          followers: 1,
          userFollowing: 1,
          following: {
            ...DB_PROJECT_USERINFO,
            isFollowing: {
              $in: ["$following.publicID", "$userFollowing"],
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          userFollowing: { $first: "$userFollowing" },
          followers: { $first: "$followers" },
          following: { $push: "$following" },
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
          from: "users",
          localField: "followers",
          foreignField: "publicID",
          as: "followers",
        },
      },
      {
        $set: {
          followers: {
            $arrayElemAt: ["$followers", 0],
          },
        },
      },
      {
        $project: {
          following: 1,
          followers: {
            ...DB_PROJECT_USERINFO,
            isFollowing: {
              $in: ["$followers.publicID", "$userFollowing"],
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          following: { $first: "$following" },
          followers: { $push: "$followers" },
        },
      },
      {
        $set: {
          followers: {
            $cond: [
              {
                $eq: ["$followers", [{ isFollowing: false }]],
              },
              [],
              "$followers",
            ],
          },
          following: {
            $cond: [
              {
                $eq: ["$following", [{ isFollowing: false }]],
              },
              [],
              "$following",
            ],
          },
        },
      },
    ]);

    if (dbResult.length > 0) {
 
      return res.json({ status: "ok", result: dbResult[0] });
    }
    res.json({ status: "error", error: "not found " });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getFollowersAndFollowing;
