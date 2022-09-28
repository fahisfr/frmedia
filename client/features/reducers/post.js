export default {
  addPost: (state, { payload }) => {
    state.posts.unshift(payload.post);
  },
  likePost: ({ posts }, { payload }) => {
    for (let post of posts) {
      if (post._id === payload.postId) {
        const { liked, likesCount } = post;
        post.likesCount = liked ? likesCount - 1 : likesCount + 1;
        post.liked = !liked;
        break;
      }
    }
  },

  setComments: ({ posts }, { payload }) => {
    for (let post of posts) {
      if (post._id === payload.postId) {
        post.comments = payload.comments;
        break;
      }
    }
  },
  addComment: ({ posts }, { payload }) => {
    try {
      for (let { _id, comments } of posts) {
        if (_id === payload.postId) {
          if (comments) {
            comments.unshift(payload.comment);
          } else {
            comments = [payload.comment];
          }
        }
        break;
      }
    } catch (error) {
      console.log(error);
    }
  },
  likeComment: ({ posts }, { payload }) => {
    for (let post of posts) {
      if (post._id === payload.postId) {
        for (let comment of post.comments) {
          if (comment._id === payload.commentId) {
            const { likesCount, liked } = comment;
            comment.likesCount = liked ? likesCount - 1 : likesCount + 1;
            comment.liked = !liked;
            break;
          }
        }
        break;
      }
    }
  },
  setReplies: ({ posts }, { payload }) => {
    for (let post of posts) {
      if (post._id === payload.postId) {
        for (let comment of post.comments) {
          if (comment._id == payload.commentId) {
            comment.replies = payload.replies;
            break;
          }
        }

        break;
      }
    }
  },
  addReply: ({ posts }, { payload }) => {
    for (let post of posts) {
      if (post._id === payload.postId) {
        for (comment of post.comments) {
          if (comment._id === payload.commentId) {
            if (comment.replies) {
              comment.replies.unshift(payload.reply);
              break;
            }
            comment.replies = [paylod.reply];
            break;
          }
        }
        break;
      }
    }
  },
  likeReply: ({ posts }, { payload }) => {
    for (let post of posts) {
      if (post._id === payload.postId) {
        for (let comment of post.comments) {
          if (comment._id === payload.commentId) {
            for (let reply of comment.replies) {
              if (reply._id === payload.replyId) {
                const { likesCount, liked } = reply;
                reply.likesCount = liked ? likesCount - 1 : likesCount + 1;
                reply.liked = !liked;
                break;
              }
            }
            break;
          }
        }
        break;
      }
    }
  },
  hidePost: ({ posts }, { payload }) => {
    posts.splice(
      posts.findIndex((post) => post._id === payload.id),
      1
    );
  },
};
