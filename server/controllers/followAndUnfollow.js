const { Router } = require("express");
const dbUser = require("../dbSchemas/user");
const objectId = require("mongoose").Types.ObjectId;

const follow = async (req, res, next) => {
  try {
    const {
      user: { id },
      body: { id: followId },
    } = req;

    const bulk = dbUser.collection.initializeUnorderedBulkOp();
    bulk
      .find({ _id: objectId(id) })
      .updateOne({ $addToSet: { following: objectId(followId) } });
    bulk
      .find({ _id: objectId(followId) })
      .updateOne({ $addToSet: { followers: objectId(id) } });

    bulk.execute((err, result) => {
      if (result.nModified) {
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
      user: { id },
      body: { id: unFollowId },
    } = req;

    const bulk = dbUser.collection.initializeUnorderedBulkOp();
    bulk
      .find({ _id: objectId(id) })
      .updateOne({ $pull: { following: objectId(unFollowId) } });
    bulk
      .find({ _id: objectId(unFollowId) })
      .updateOne({ $pull: { followers: objectId(id) } });

    bulk.execute((err, result) => {
      if (result.nModified) {
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
