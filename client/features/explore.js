import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import postReducers from "./reducers/post";

export const fetchExplore = createAsyncThunk("/fetchexplore", async () => {
  const { data } = await axios.get("/explore");
  return data;
});

const exploreSlice = createSlice({
  name: "explore",
  initialState: {
    posts: [],
    fetched: false,
    loading: false,
    error: null,
  },
  reducers: postReducers,
  extraReducers: {
    [fetchExplore.fulfilled]: (state, { payload }) => {
      if (payload.status === "ok") {
        state.posts.push(...payload.posts);
      } else if (payload.status === "error") {
        state.error = payload.error;
      }
      state.loading = false;
      state.fetched = true;
    },
    [fetchExplore.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchExplore.rejected]: (state, action) => {
      state.loading = false;
      state.error = "opps somthing went wrong";
    },
  },
});
export const actions = exploreSlice.actions;
export default exploreSlice.reducer;
