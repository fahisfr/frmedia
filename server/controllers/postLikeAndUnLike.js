const dbPost = require("../dbSchemas/post");

const likePost = async (_, { postId }, { req, INSERR }) => {
  
  try {
    const { id } = req.user;
    const PostLiked = await dbPost.updateOne(
      {
        _id: postId,
      },
      {
        $push: {
          likes: id,
        },
      }
    );

    if (PostLiked.modifiedCount > 0) {
      return {
        __typename: "Success",
        message: "post liked",
      };
    }

    return {
      __typename: "Error",
      message: "Could not like this post",
    };
  } catch (err) {
    return INSERR;
  }
};

const unLikePost = async (_, { postId }, { req, INSERR }) => {
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

    if (PostUnLiked.modifiedCount > 0) {
      return {
        __typename: "Success",
        message: "post unliked",
      };
    }
    return {
      __typename: "Error",
      message: "Could not unlike this post",
    };
  } catch (err) {
    console.log(err);
    return INSERR;
  }
};

module.exports = {
  likePost,
  unLikePost,
};
