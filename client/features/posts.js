import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../axios";

Array.prototype.findIndexByID = function (id) {
  return this.findIndex((item) => item._id === id);
};

export const fetchPosts = createAsyncThunk("/fetchPosts", async () => {
  const { data } = await axios.get("/home");
  return data;
});

const userSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: false,
    errorMessage: null,
    fetched: false,
  },
  reducers: {
    addPost: (state, { payload }) => {
      state.posts.unshift(payload);
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
      for (let post of posts) {
        if (post._id === payload.postId) {
          post.comments.unshift(payload.comment);
          break;
        }
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
              comment.replies.unshift(payload.reply);
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
  },
  extraReducers: {
    [fetchPosts.fulfilled]: (state, { payload }) => {
      if (payload.status === "ok") {
        state.posts = payload.posts;
      }
      state.loading = false;
      state.fetched = true;
    },
    [fetchPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = "opps somthing went wrong";
    },
  },
});

export const {
  addPost,
  addReply,
  setComments,
  addComment,
  setReplies,
  likePost,
  likeReply,
  likeComment,
} = userSlice.actions;
export default userSlice.reducer;
