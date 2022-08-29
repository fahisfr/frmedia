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
    addPosts: (state, action) => state.posts.push(action.payload),
    likePost: ({ posts }, { payload }) => {
      const postInd = posts.findIndexByID(payload.postId);
      const { likesCount, liked } = posts[postInd];
      posts[postInd].liked = !liked;
      posts[postInd].likesCount = liked ? likesCount - 1 : likesCount + 1;
    },

    setComments: ({ posts }, { payload }) => {
      const postIndex = posts.findIndexByID(payload._id);
      posts[postIndex].comments = payload.comments;
    },
    addComment: ({ posts }, { payload }) => {
      const postIndex = posts.findIndexByID(payload.postId);
      posts[postIndex].comments.push(payload);
    },
    likeComment: ({ posts }, { payload }) => {
      const postIndex = posts.findIndexByID(payload.postId);
      const commentIndex = posts[postIndex].comments.findIndexByID(
        payload.commentId
      );
      const { likesCount, liked } = posts[postIndex].comments[commentIndex];
      posts[postIndex].comments[commentIndex].liked = !liked;
      posts[postIndex].comments[commentIndex].likesCount = liked
        ? likesCount - 1
        : likesCount + 1;
    },
    setReplies: ({ posts }, { payload }) => {
      console.log(payload);
      const postIndex = posts.findIndexByID(payload.postId);
      const commentIndex = posts[postIndex].comments.findIndexByID(
        payload.commentId
      );
      posts[postIndex].comments[commentIndex].replies = payload.replies;
    },
    addReply: ({ posts }, { payload }) => {
      const postIndex = posts.findIndexByID(payload.postId);
      const commentIndex = posts[postIndex].comments.findIndexByID(
        payload.commentId
      );
      posts[postIndex].comments[commentIndex].replies.push(payload.reply);
    },
    likeReply: ({ posts }, { payload }) => {
      const postIndex = posts.findIndexByID(payload.postId);
      const commentIndex = posts[postIndex].comments.findIndexByID(
        payload.commentId
      );
      const replyIndex = posts[postIndex].comments[
        commentIndex
      ].replies.findIndexByID(payload.replyId);
      const { likesCount, liked } =
        posts[postIndex].comments[commentIndex].replies[replyIndex];
      posts[postIndex].comments[commentIndex].replies[replyIndex].likesCount =
        liked ? likesCount - 1 : likesCount + 1;
      posts[postIndex].comments[commentIndex].replies[replyIndex].liked =
        !liked;
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
  setComments,
  addComment,
  setReplies,
  likePost,
  likeReply,
  likeComment,
} = userSlice.actions;
export default userSlice.reducer;
