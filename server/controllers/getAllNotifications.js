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
        $group: {
          _id: null,
          notifCount: { $first: "$notifCount" },
          notifications: { $push: "$notifications" },
        },
      },
    ]);
    console.log(dbResult[0]);
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
