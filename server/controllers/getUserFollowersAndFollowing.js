const dbUser = require("../dbSchemas/user");
const objectId = require("mongoose").Types.ObjectId;
const { idIn } = require("../helper/dbHelper");

const getFollowersAndFollowing = async (req, res, next) => {
  try {
    const { userName } = req.params;
    const id = req.user?.id;
    const dbResult = await dbUser.aggregate([
      {
        $match: { userName },
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
          foreignField: "publicID",
          from: "users",
          as: "following",
        },
      },
      {
        $set: {
          following: {
            $cond: [
              { $ne: ["following", []] },
              {
                $arrayElemAt: ["$following", 0],
              },
              [],
            ],
          },
        },
      },
      {
        $project: {
          followers: 1,
          following: {
            userName: 1,
            profilePic: 1,
            coverPic: 1,
            verifed: 1,
          },
        },
      },
      {
        $group: {
          _id: null,
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
          localField: "followers",
          foreignField: "publicID",
          from: "users",
          as: "followers",
        },
      },
      {
        $set: {
          followers: {
            $cond: [
              { $eq: ["$followers", []] },
              [],
              {
                $arrayElemAt: ["$followers", 0],
              },
            ],
          },
        },
      },
      {
        $project: {
          following: 1,
          followers: {
            userName: 1,
            profilePic: 1,
            coverPic: 1,
            verifed: 1,
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
                $eq: ["$followers", [[]]],
              },
              [],
              "$followers",
            ],
          },
          following: {
            $cond: [
              {
                $eq: ["$following", [[]]],
              },
              [],
              "$following",
            ],
          },
        },
      },
    ]);
    if (dbResult.length > 0) {
      return res.json({ status: "ok", info: dbResult[0] });
    }

    res.json({ status: "error", error: "not found " });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getFollowersAndFollowing;
