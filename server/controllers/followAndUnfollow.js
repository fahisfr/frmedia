const { Router } = require("express");
const dbUser = require("../dbSchemas/user");

const follow = async (_, { followId }, { req, INSERR }) => {
  try {
    const { id } = req.user;

    const following = await dbUser.updateOne(
      { _id: followId },
      { $push: { followers: id } }
    );

    console.log(following);

    if (following.modifiedCount > 0) {
      return {
        __typename: "Success",
        message: "followed",
      };
    }

    return {
      __typename: "Error",
      message: "Could not follow this user",
    };
  } catch (err) {
    return INSERR;
  }
};

const unFollow = async (_, { unFollowId }, { req, INSERR }) => {
  try {
    const { id } = await req.user;
    const unFollowed = dbUser.updateOne(
      { _id: unFollowId },
      { $pull: { followers: id } }
    );

    if (unFollowed.modifiedCount > 0) {
      return {
        __typename: "Success",
        message: "unfollowed",
      };
    }
    return {
      __typename: "Error",
      message: "Could not unfollow this user",
    };
  } catch (err) {
    return INSERR;
  }
};

module.exports = { follow, unFollow };
