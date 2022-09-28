const dbUser = require("../dbSchemas/user");
const objectId = require("mongoose").Types.ObjectId;
const { idIn } = require("../helper/dbHelper");

const home = async (req, res, next) => {
  try {
    const { id, publicID } = req.user;
    const getPosts = await dbUser.aggregate([
      {
        $match: {
          _id: objectId(id),
        },
      },
      {
        $set: {
          following: {
            $concatArrays: ["$following", [objectId(publicID)]],
          },
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
          as: "user",
        },
      },
      {
        $project: {
          user: {
            $arrayElemAt: ["$user", 0],
          },
        },
      },
      {
        $unwind: {
          path: "$user.posts",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "user.posts",
          foreignField: "_id",
          as: "post",
        },
      },
      {
        $set: {
          post: {
            $arrayElemAt: ["$post", 0],
          },
        },
      },
      {
        $sort: {
          "post.postAt": -1,
        },
      },
      {
        $project: {
          post: {
            userInfo: {
              publicID: "$user.publicID",
              userName: "$user.userName",
              profilePic: "$user.profilePic",
              coverPic: "$user.coverPic",
              bio: "$user.bio",
              verified: "$user.verified",
            },
            likesCount: { $size: "$post.likes" },
            commentsCount: { $size: "$post.comments" },
            liked: idIn(publicID, "$post.likes"),
            _id: 1,
            text: 1,
            file: 1,
            editAt: 1,
            postAt: 1,
          },
        },
      },
      {
        $group: {
          _id: null,
          posts: { $push: "$post" },
        },
      },
      
    ]);

    console.log(getPosts[0]);

    if (getPosts.length > 0) {
      return res.json({ status: "ok", posts: getPosts[0].posts });
    }
    res.status(400).json({ status: "error", error: "not found" });
  } catch (err) {
    next(err);
  }
};

module.exports = home;
