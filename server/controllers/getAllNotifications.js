const dbUser = require("../dbSchemas/user");
const objectId = require("mongoose").Types.ObjectId;

const notifications = async (req, res, next) => {
  try {
    const { id } = req.user;
    const dbResult = await dbUser.aggregate([
      { $match: { _id: objectId(id) } },
      {
        $project: {
          notifications: { $reverseArray: "$notifications" },
          notifCount: 1,
        },
      },

      {
        $unwind: {
          path: "$notifications",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "notifications.userId",
          foreignField: "publicID",
          as: "notifications.userInfo",
        },
      },
      {
        $set: {
          "notifications.userInfo": {
            $arrayElemAt: ["$notifications.userInfo", 0],
          },
        },
      },
      {
        $project: {
          notifCount: 1,
          notifications: {
            type: 1,
            userId: 1,
            postId: 1,
            commentId: 1,
            replyId:1,
            pcr: 1,
            userInfo: {
              publicID: 1,
              userName: 1,
              profilePic: 1,
              coverPic: 1,
              verified: 1,
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          notifCount: { $first: "$notifCount" },
          notifications: { $push: "$notifications" },
        },
      },
    ]);

    if (dbResult.length > 0) {
      res.json({ status: "ok", notifications: dbResult[0].notifications });

      if (dbResult[0].notifCount > 0) {
        await dbUser.updateOne({ _id: id }, { $set: { notifCount: 0 } });
      }
      return;
    }
  } catch (err) {
    next(err);
  }
};

module.exports = notifications;
