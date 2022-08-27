import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../axios";

export const fetchPosts = createAsyncThunk("/fetchPosts", async () => {
  const { data } = await axios.get("/home");
  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    posts: [],
    loading: false,
    error: false,
    errorMessage: null,
  },
  reducers: {
    setPosts: (state, action) => state.posts.push(action.payload),
  },
  extraReducers: {
    [fetchPosts.fulfilled]: (state, { payload }) => {
      
      if (payload.status === "ok") {
        state.posts = payload.posts;
        state.loading = false;
      }
    },
    [fetchPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default userSlice.reducer;
