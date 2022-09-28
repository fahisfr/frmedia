import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postReducers from "./reducers/post";

const hashTagsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    fetchedHashTags: [],
  },
  reducers: {
    ...postReducers,
    addTagedPosts: ({ posts, fetchedHashTags }, { payload }) => {
      fetchedHashTags.push(payload.hashTage);
      const newPosts = payload.posts.map((post) => {
        return post;
      });
      posts.push(...newPosts);
    },
  },
});

export const actions = hashTagsSlice.actions;

export default hashTagsSlice.reducer;
