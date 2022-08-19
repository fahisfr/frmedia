const dbPost = require("../dbSchemas/post");

const likeComment = async (_, { postId, commentId }, { req, INSERR }) => {
  try {
    
    const { id } = req.user;
    const liked = await dbPost.updateOne(
      {
        _id: postId,
      },
      {
        $push: {
          "comments.$[index].likes": id,
        },
      },
      {
        arrayFilters: [
          {
            "index._id": commentId,
          },
        ],
      }
    );


    if (liked.modifiedCount > 0) {
      return {
        __typename: "Success",
        message: "comment liked",
      };
    }
    return {
      __typename: "Error",
      message: "Could not like this comment",
    };
  } catch (err) {
    console.log(err)
    return INSERR;
  }
};


const unLikeComment = async (_, { postId, commentId }, { req, INSERR }) => {
  try {
    const { id } = req.user;
    const liked = await dbPost.updateOne(
      {
        _id: postId,
      },
      {
        $pull: {
          "comments.$[indec].replies.$[indec].likes": id,
        },
      },
      {
        arrayFilters: [
          {
            "index._id": commentId,
          },
        ],
      }
    );

    if (liked.modifiedCount > 0) {
      return {
        __typename: "Success",
        message: "comment unliked",
      };
    }
    return {
      __typename: "Error",
      message: "could not unlike this comment",
    };
  } catch (err) {
    return INSERR;
  }
};

module.exports = {
  likeComment,
  unLikeComment,
}
