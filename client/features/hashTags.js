import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postReducers from "./reducers/post";

const hashTagsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    fetchedHashTags: [],
  },
  reducers: postReducers,
});

export const actions = hashTagsSlice.actions;

export default hashTagsSlice.reducer;
