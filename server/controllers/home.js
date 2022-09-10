const dbUser = require("../dbSchemas/user");
const getPost = require("./getPost");
const objectId = require("mongoose").Types.ObjectId;

const home = async (req, res, next) => {
  try {
    const { id } = req.user;
    const getPosts = await dbUser.aggregate([
      {
        $match: {
          _id: objectId(id),
        },
      },
      {
        $set: {
          following: {
            $concatArrays: ["$following", [objectId(id)]],
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
          foreignField: "_id",
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
              _id: "$user._id",
              userName: "$user.userName",
              profilePic: "$user.profilePic",
              coverPic: "$user.coverPic",
              bio: "$user.bio",
              verified: "$user.verified",
            },
            likesCount: {
              $size: "$post.likes",
            },
            commentsCount: {
              $size: "$post.comments",
            },
            liked: {
              $in: [objectId(id), "$post.likes"],
            },
            _id: 1,
            text: 1,
            file: 1,
            editAt: 1,
            postAt: 1,
            page: "home",
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
    if (getPosts.length > 0) {
      return res.json({ status: "ok", posts: getPosts[0].posts });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = home;
