const dbUser = require("../dbSchemas/user");
const { idIn } = require("./helper");

const getUserInfo = async (req, res, next) => {
  try {
    const publicID = req.user?.publicID;
    const { userName } = req.params;

    const user = await dbUser.aggregate([
      {
        $match: {
          userName,
        },
      },
      {
        $addFields: {
          isFollowing: idIn(publicID, "$followers"),
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
        $set: {
          posts: {
            $arrayElemAt: ["$posts", 0],
          },
        },
      },
      {
        $addFields: {
          posts: {
            $cond: [
              "$posts._id",
              {
                _id: "$posts._id",
                text: "$posts.text",
                file: "$posts.file",
                postAt: "$posts.postAt",
                commentsCount: {
                  $size: "$posts.comments",
                },
                likesCount: {
                  $size: "$posts.likes",
                },
                liked: idIn(publicID, "$posts.likes"),
              },
              "$$REMOVE",
            ],
          },
        },
      },

      {
        $group: {
          _id: "$_id",
          publicID: { $first: "$publicID" },
          userName: { $first: "$userName" },
          email: { $first: "$email" },
          profilePic: { $first: "$profilePic" },
          coverPic: { $first: "$coverPic" },
          bio: { $first: "$bio" },
          link: { $first: "$link" },
          verified: { $first: "$verified" },
          posts: { $push: "$posts" },
          followersCount: { $first: { $size: "$followers" } },
          followingCount: { $first: { $size: "$following" } },
          isFollowing: { $first: "$isFollowing" },
        },
      },
    ]);

    if (user.length > 0) {
      return res.json({ status: "ok", profile: user[0] });
    }
    res.json({ status: "error", error: "User not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = getUserInfo;
