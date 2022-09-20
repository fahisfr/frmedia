export default {
  follow: (state, { payload }) => {
    for (let profile of state.profiles) {
      if (profile.userName === state.userName) {
        profile.isFollowing = !profile.isFollowing;
      }
    }
  },
  setUserName: (state, { payload }) => {
    state.userName = payload;
  },
  addProfile: (state, { payload }) => {
    state.profiles.push(payload);
  },
  likePost: ({ userName, profiles }, { payload }) => {
    for (let profile of profiles) {
      if (profile.userName === userName) {
        for (let post of profile.posts) {
          if (post._id === payload.postId) {
            const { liked, likesCount } = post;
            post.likesCount = liked ? likesCount - 1 : likesCount + 1;
            post.liked = !liked;
            break;
          }
        }
        break;
      }
    }
  },
  setComments: ({ userName, profiles }, { payload }) => {
    for (let profile of profiles) {
      if (profile.userName === userName) {
        for (let post of profile.posts) {
          if (post._id === payload.postId) {
            post.comments = payload.comments;
            break;
          }
        }
        break;
      }
    }
  },
  addComment: (state, { payload }) => {
    for (let { userName, posts } of state.profiles) {
      if (userName == state.userName) {
        for (let post of posts) {
          if (post._id === payload.postId) {
            if (post.comments) {
              post.comments.unshift(payload.comment);
              break;
            }
            post.comments = [payload.comment];
            break;
          }
        }
        break;
      }
    }
  },
  likeComment: (state, { payload }) => {
    for (let { userName, posts } of state.profiles) {
      if (userName === state.userName) {
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
        break;
      }
    }
  },
  setReplies: (state, { payload }) => {
    for (let { userName, posts } of state.profiles) {
      if (userName == state.userName) {
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
        break;
      }
    }
  },
  addReply: (state, { payload }) => {
    for (let { userName, posts } of state.profiles) {
      if (userName == state.userName) {
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

        break;
      }
    }
  },
  likeReply: (state, { payload }) => {
    for (let { userName, posts } of state.profiles) {
      if (userName == state.userName) {
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
        break;
      }
    }
  },
};
