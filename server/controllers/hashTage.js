const dbPost = require("../dbSchemas/post");
const objectId = require("mongoose").Types.ObjectId;

const hashTags = async (req, res, next) => {
  try {
    const { user, params } = req;
    const id = user?.id;
    const posts = await dbPost.aggregate([
      {
        $match: {
          hashTags: { $in: [params.tage] },
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
          userInfo: { $arrayElemAt: ["$userInfo", 0] },
        },
      },
      {
        $project: {
          _id: 1,
          text: 1,
          file: 1,
          postAt: 1,
          likes: 1,
          commentsCount: 1,
          postAt: 1,
          likesCount: { $size: "$likes" },
          comments: { $size: "$comments" },
          page: "tage",
          tage: params.tage,
          userInfo: {
            userName: 1,
            profilePic: 1,
            coverPic: 1,
            isVerified: 1,
          },

          liked: {
            $cond: [
              { $ifNull: [id, true] },
              { $in: [objectId(id), "$comments.likes"] },
              false,
            ],
          },
        },
      },
    ]);

    if (posts.length > 0) {
      res.json({ status: "ok", posts });

      return;
    }
    res.json({ status: "error", error: `Resutl not found` });
  } catch (error) {
    next(error);
  }
};

module.exports = hashTags;
