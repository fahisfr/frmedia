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
      profilePic: null,
      avatarPic: null,
      followingCount: null,
      followersCount: null,
    },
    isAuth: false,
    loading: false,
    error: false,
  },
  reducers: {
    updateUserInfo: (state, action) => {
      console.log("his",action)


      state.userInfo={ ...state.userInfo, ...action.payload.userInfo}
     
    },
    setPosts: (state, action) => state.posts.push(action.payload),
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, { payload }) => {
      if (payload.status === "ok") {
        state.userInfo = payload.userInfo;
        state.isAuth = true;
      }
    },
    [fetchUser.pending]: (state, action) => {},
    [fetchUser.rejected]: (state, action) => {},
  },
});

export const { updateUserInfo } = userSlice.actions;

export default userSlice.reducer;
