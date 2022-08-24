const dbUser = require("../dbSchemas/user");
const objectId = require("mongoose").Types.ObjectId;

const getUserInfo = async (req, res, next) => {
  try {
    const id = req.user?.id;
    const { userName } = req.params;

    const user = await dbUser.aggregate([
      {
        $match: {
          userName,
        },
      },
      {
        $addFields: {
          _following: {
            $cond: [
              { $ifNull: [id, false] },
              { $in: [objectId(id), "$following"] },
              false,
            ],
          },
        },
      },
      {
        $unwind: {
          path: "$posts",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "posts",
          foreignField: "_id",
          as: "posts",
        },
      },
      {
        $addFields: {
          "posts.commentsCount": {
            $size: "$posts.comments",
          },
          "posts.likesCount": {
            $size: "$posts.likes",
          },
          "posts.liked":{
            $in:[objectId(id),"$posts.likes"]
          }
        },
      },
      {
        $group: {
          _id: "$_id",
          userName: { $first: "$userName" },
          email: { $first: "$email" },
          profilePic: { $first: "$profilePic" },
          coverPic: { $first: "$coverPic" },
          bio: { $first: "$bio" },
          isVerified: { $first: "$isVerified" },
          posts: { $push: { $arrayElemAt: ["$posts", 0] } },
          followersCount: { $first: { $size: "$followers" } },
          followingCount: { $first: { $size: "$following" } },
          _following: { $first: "$_following" },
        },
      },
    ]);

    console.log(user);
    if (user.length > 0) {
      res.json({ status: "ok", userInfo: user[0] });
      return;
    }
    res.json({ status: "error", error: "User not found" });
    return;
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getUserInfo;
