const { Router } = require("express");
const dbUser = require("../dbSchemas/user");

const follow = async (req, res, next) => {
  try {
    const {
      user: { id },
      body: { followId },
    } = req;

    const following = await dbUser.updateOne(
      { _id: followId },
      { $push: { followers: id } }
    );

    console.log(following);

    if (following.modifiedCount > 0) {
      res.json({
        __typename: "ok",
      });
    }
    res.json({
      status: "error",
      message: "Could not follow this user",
    });
  } catch (err) {
    next();
  }
};

const unFollow = async (req, res, next) => {
  try {
    const {
      user: { id },
      body: { unFollowId },
    } = req;

    const unFollowed = dbUser.updateOne(
      { _id: unFollowId },
      { $pull: { followers: id } }
    );

    if (unFollowed.modifiedCount > 0) {
      res.json({
        status: "ok",
        message: "unfollowed",
      });
    }
    res.json({ status: "error", message: "Could not unfollow this user" });
  } catch (err) {
    next();
  }
};

module.exports = { follow, unFollow };
