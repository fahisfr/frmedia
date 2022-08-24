import axios from "../axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const { data } = await axios.get("/auth");
  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      userName: null,
      bio: null,
      link: null,
      posts: [],
      profilePic: null,
      avatarPic: null,
      followingCount: null,
      followersCount: null,
    },
    isAuth:false,
    loading: false,
    error: false,
  },
  reducers: {
    setUserInfo: (state, action) => (state.userInfo = action.payload),
    setPosts: (state, action) => state.posts.push(action.payload),
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
       state.userInfo = action.userInfo
    },
    [fetchUser.pending]: (state, action) => {},
    [fetchUser.rejected]: (state, action) => {},
  },
});

export default userSlice.reducer;
