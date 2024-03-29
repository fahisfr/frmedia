const dbUser = require("../dbSchemas/user");
const objectId = require("mongoose").Types.ObjectId;

const follow = async (req, res, next) => {
  try {
    const {
      user: { id, publicID },
      body: { id: followId },
    } = req;

    const bulk = dbUser.collection.initializeUnorderedBulkOp();
    bulk
      .find({ _id: objectId(id) })
      .updateOne({ $addToSet: { following: objectId(followId) } });
    bulk.find({ publicID: objectId(followId) }).updateOne({
      $addToSet: { followers: objectId(publicID) },
      $push: {
        notifications: { type: "following", userId: objectId(followId) },
      },
    });

    bulk.execute((err, result) => {
      if (result.nModified > 0) {
        res.json({ status: "ok" });
        return;
      }
      res.json({ status: "error", message: "Could not follow this user" });
    });
  } catch (err) {
    next(err);
  }
};

const unFollow = async (req, res, next) => {
  try {
    const {
      user: { id, publicID },
      body: { id: unFollowId },
    } = req;

    const bulk = dbUser.collection.initializeUnorderedBulkOp();
    bulk
      .find({ _id: objectId(id) })
      .updateOne({ $pull: { following: objectId(unFollowId) } });
    bulk
      .find({ publicID: objectId(unFollowId) })
      .updateOne({ $pull: { followers: objectId(publicID) } });

    bulk.execute((err, result) => {
      if (result.nModified > 0) {
        res.json({ status: "ok" });
        return;
      }
      res.json({ status: "error", message: "Could not unFollow this user" });
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { follow, unFollow };
