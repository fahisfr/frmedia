import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchPosts = createAsyncThunk("/fetchPosts", async () => {
  const { data } = await axios.get("/home");
  return data;
});

export const fetchExplore = createAsyncThunk("/fetchexplore", async () => {
  const { data } = await axios.get("/explore");
  return data;
});

const userSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],

    loading: false,
    homeError: false,
    homeFetched: false,

    exploreLoading: false,
    exploreError:false,
    exploreFetched: false,

    fetchedHashTags: {},
  },
  reducers: {
    addPost: (state, { payload }) => {
      try {
        payload.page = "home";
        state.posts.unshift(payload);
      } catch (err) {
        conosle.log(err);
      }
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
          if (post.commets) {
            post.comments.unshift(payload.comment);
            break;
          }
          post.comments = [payload.comment];
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
    addTagedPosts: ({ posts, fetchedHashTags }, { payload }) => {
      fetchedHashTags[payload.hashTage] = true;
      const newPosts = payload.posts.map((post) => {
        post.tage = payload.hashTage;
        return post;
      });
      posts.push(...newPosts);
    },
    deletePost: ({ posts }, { payload }) => {
      const postInd = posts.findIndex((post) => post._id === payload._id);
      posts.splice(postInd, 1);
    },
  },
  extraReducers: {
    [fetchPosts.fulfilled]: (state, { payload }) => {
      if (payload.status === "ok") {
        state.posts.push(...payload.posts);
      } else if (payload.status === "error") {
        state.homeError = payload.error;
      }
      state.homeLoading = false;
      state.homeFetched = true;
    },

    [fetchPosts.pending]: (state, action) => {
      state.loading = true;
    },

    [fetchPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = "opps somthing went wrong";
    },



    [fetchExplore.fulfilled]: (state, { payload }) => {

 
      if (payload.status === "ok") {
        state.posts.push(...payload.posts);
      } else if (payload.status === "error") {
        state.exploreError = payload.error;
      }
      state.exploreLoading = false;
      state.exploreFetched = true;

    },
    [fetchExplore.pending]: (state, action) => {
      state.exploreLoading = true;
    },
    [fetchExplore.rejected]: (state, action) => {
      state.exploreLoading = false;
      state.exploreError ="opps somthing went wrong";
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
  addTagedPosts,
  deletePost,
} = userSlice.actions;
export default userSlice.reducer;
