import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postReducers from "./reducers/post";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profiles: [
      {
        userName: "",
        bio: "",
        link: "",
        profilePic: "",
        coverPic: "",
        followingCount: 0,
        followersCount: 0,
      },
    ],
    posts: [],
  },
  reducers: {
    ...postReducers,
    addProfile: (state, { payload }) => {
      state.posts.push(
        ...payload.posts.map((post) => {
          post.userName = payload.userName;
          return post;
        })
      );
      payload.posts = [];
      state.profiles.push(payload);
    },
  },
});

export const actions = profileSlice.actions;

export default profileSlice.reducer;
