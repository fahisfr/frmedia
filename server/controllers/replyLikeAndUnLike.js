const dbPost = require("../dbSchemas/post");

const likeReply = async (_, arg, { req, INSERR }) => {

  try {
    const { id } = req.user;
    const { postId, commentId, replyId } = arg;
    
    const liked = await dbPost.updateOne(
      {
        _id: postId,
      },
      {
        $push: {
          "comments.$[commentInd].replies.$[replyInd].likes": id,
        },
      },
      {
        arrayFilters: [
          {
            "commentInd._id": commentId,
          },
          {
            "replyInd._id": replyId,
          },
        ],
      }
    );

    console.log(liked)

    if (liked.modifiedCount > 0) {
      return {
        __typename: "Success",
        message: "reply liked",
      };
    }
    return {
      __typename: "Error",
      message: "Could not like this reply",
    };
  } catch (err) {
    console.log(err)
    return INSERR;
  }
};

const unLikeReply = async (_, arg, { req, INSERR }) => {
  try {
    const { id } = req.user;
    const { postId, commentId, replyId } = arg;
    const unLiked = dbPost.updateOne(
      {
        _id: postId,
      },
      {
        $push: {
          "comments.$[commentInd].replies.$[replyInd].likes": id,
        },
      },
      {
        arrayFilters: [
          {
            "commentInd._id": commentId,
          },
          {
            "replieInd._id": replyId,
          },
        ],
      }
    );

    if (unLiked.modifiedCount > 0) {
      return {
        __typename: "Success",
        message: "reply liked",
      };
    }
    return {
      __typename: "Error",
      message: "Could not like this reply",
    };
  } catch (err) {
    return INSERR;
  }
};

module.exports = {
  likeReply,
  unLikeReply,
};
