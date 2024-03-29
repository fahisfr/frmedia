const dbUser = require("../dbSchemas/user");
const objectId = require("mongoose").Types.ObjectId;
const db = require("./helper");

const getMentions = async (req, res, next) => {
  try {
    const { publicID, id } = req.user;

    const dbResult = await dbUser.aggregate([
      {
        $match: {
          _id: objectId(id),
        },
      },
      {
        $project: {
          notifications: {
            $filter: {
              input: "$notifications",
              as: "notif",
              cond: {
                $eq: ["$$notif.type", "mention"],
              },
            },
          },
        },
      },
      {
        $unwind: "$notifications",
      },
      {
        $group: {
          _id: "$notifications.pcr",
          notif: {
            $push: "$notifications",
          },
        },
      },
      {
        $group: {
          _id: null,
          notif: {
            $push: {
              k: "$_id",
              v: "$notif",
            },
          },
        },
      },
      {
        $replaceWith: {
          $arrayToObject: "$notif",
        },
      },
      {
        $unwind: {
          path: "$reply",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $lookup: {
          from: "posts",
          let: {
            commentId: "$reply.commentId",
            replyId: "$reply.replyId",
            postId: "$reply.postId",
          },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$_id", "$$postId"] } },
            },
            { $unwind: "$comments" },
            {
              $match: { $expr: { $eq: ["$comments._id", "$$commentId"] } },
            },
            {
              $replaceWith: "$comments",
            },
            { $unwind: "$replies" },
            {
              $match: { $expr: { $eq: ["$replies._id", "$$replyId"] } },
            },
            { $replaceWith: "$replies" },
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "publicID",
                as: "userInfo",
              },
            },
            {
              $set: {
                userInfo: { $arrayElemAt: ["$userInfo", 0] },
              },
            },
            {
              $project: db.DB_PROJECT_REPLY_LC(publicID),
            },
          ],
          as: "reply.info",
        },
      },
      {
        $set: {
          "reply.info": { $arrayElemAt: ["$reply.info", 0] },
        },
      },
      {
        $group: {
          _id: null,
          post: { $first: "$post" },
          comment: { $first: "$comment" },
          reply: { $push: "$reply" },
        },
      },
      {
        $unwind: {
          path: "$comment",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "posts",
          let: {
            commentId: "$comment.commentId",
            postId: "$comment.postId",
          },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$_id", "$$postId"] } },
            },
            { $project: { comments: 1 } },
            { $unwind: "$comments" },
            {
              $match: { $expr: { $eq: ["$comments._id", "$$commentId"] } },
            },
            {
              $replaceWith: "$comments",
            },
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "publicID",
                as: "userInfo",
              },
            },
            {
              $set: {
                userInfo: { $arrayElemAt: ["$userInfo", 0] },
              },
            },
            {
              $project: db.DB_PROJECT_COMMENT_LC(publicID),
            },
          ],
          as: "comment.commentInfo",
        },
      },
      {
        $set: {
          "comment.commentInfo": { $arrayElemAt: ["$comment.commentInfo", 0] },
        },
      },

      {
        $group: {
          _id: null,
          post: { $first: "$post" },
          comment: { $push: "$comment" },
          reply: { $first: "$reply" },
        },
      },
      {
        $unwind: {
          path: "$post",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "posts",
          let: { postId: "$post.postId" },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$_id", "$$postId"] } },
            },
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "publicID",
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
              $project: db.DB_PROJECT_POST_LC(publicID),
            },
          ],
          as: "post.info",
        },
      },
      {
        $set: {
          "post.info": {
            $arrayElemAt: ["$post.info", 0],
          },
        },
      },
      {
        $group: {
          _id: null,
          post: { $push: "$post" },
          comment: { $first: "$comment" },
          reply: { $first: "$reply" },
        },
      },
      {
        $project: {
          mentions: {
            $filter: {
              input: { $concatArrays: ["$post", "$comment", "$reply"] },
              cond: {
                $gt: ["$$this.info", null],
              },
            },
          },
        },
      },
    ]);

    console.log(dbResult);

    if (dbResult.length > 0) {
      return res.json({ status: "ok", mentions: dbResult[0].mentions });
    }
    res.json({ status: "ok", mentions: [] });
  } catch (error) {
    next(error);
  }
};

module.exports = getMentions;
