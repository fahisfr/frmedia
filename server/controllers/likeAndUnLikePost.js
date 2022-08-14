const dbPost = require("../dbSchemas/post");
const { INTERNAL_SERVER_ERROR } = require("../config/customErrors");

const likePost = async (_, { postId }, { req }) => {
  try {

    const PostLiked = await dbPost.updateOne(
      {
        _id: postId,
      },
      {
        $push: {
          likes:id,
        },
      }
    );

    if (PostLiked.modifiedCount > 1) {
      return {
        __typename: "Success",
        message: "post liked",
      };
    }

    return {
      __typename: "Error",
      message: "could not like post",
    };
  } catch (err) {
    return INTERNAL_SERVER_ERROR;
  }
};

const unLikePost = async(_, { postId }, { req }) => {
  try {
    const { id } = req.user;
    const PostUnLiked = await dbPost.updateOne(
      {
        _id: postId,
      },
      {
        $pull: {
          likes: id,
        },
      }
    );

    if (PostUnLiked.modifiedCount > 1) {
      return {
        __typename: "Success",
        message: "post unliked",
      };
    }
    return {
      __typename: "Error",
      message: "could not unlike post",
    };
  } catch (err) {
    return INTERNAL_SERVER_ERROR;
  }
};

module.exports = {
  likePost,
  unLikePost,
};
