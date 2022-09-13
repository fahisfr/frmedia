import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import postReducers from "./reducers/post";

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
    exploreError: false,
    exploreFetched: false,

    fetchedHashTags: [],
  },
  reducers: postReducers,
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
      state.homeLoading = true;
    },

    [fetchPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = "opps somthing went wrong";
    },
  },
});

export const actions = userSlice.actions;
export default userSlice.reducer;
