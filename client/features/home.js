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
    error: false,
    fetched: false,
  },
  reducers: postReducers,
  extraReducers: {
    [fetchPosts.fulfilled]: (state, { payload }) => {
      if (payload.status === "ok") {
        state.posts.push(...payload.posts);
      } else if (payload.status === "error") {
        state.homeError = payload.error;
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

export const actions = userSlice.actions;
export default userSlice.reducer;
