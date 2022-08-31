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
      const postIndex = posts.findIndexByID(payload._id);
      posts[postIndex].comments = payload.comments;
    },
    addComment: ({ posts }, { payload }) => {
      for (let post of posts) {
        if (post._id === payload.postId) {
          post.comments.push(payload.comment);
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
            }
            break;
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
            }
            break;
          }
          break;
        }
      }
    },
    addReply: ({ posts }, { payload }) => {
      const postIndex = posts.findIndexByID(payload.postId);
      const commentIndex = posts[postIndex].comments.findIndexByID(
        payload.commentId
      );
      posts[postIndex].comments[commentIndex].replies.push(payload.reply);
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
    },
    [fetchPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const {
  addPost,
  setComments,
  addComment,
  setReplies,
  likePost,
  likeReply,
  likeComment,
} = userSlice.actions;
export default userSlice.reducer;
