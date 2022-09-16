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
      bio: "",
      link: "",
      profilePic: "",
      coverPic: "",
      followingCount: 0,
      followersCount: 0,
      notifCount: 0,
      following: [],
      followers: [],
    },
    ffFetched: false,
    isAuth: false,
    loading: false,
    error: false,
  },
  reducers: {
    updateUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload.userInfo };
    },
    notifCount: ({ userInfo }, action) => {
      userInfo.notifCount = 0;
    },
    addFF: ({ userInfo, ffFetched }, { payload }) => {
      try {
        console.log("fahis main load");
        console.log(payload);
        userInfo.followers = payload.followers;
        userInfo.following = payload.following;
        ffFetched = true;
      } catch (err) {
        console.log(err);
      }
    },
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, { payload }) => {
      if (payload.status === "ok") {
        state.userInfo = { ...state.userInfo, ...payload.userInfo };
        state.isAuth = true;
      }
    },
    [fetchUser.pending]: (state, action) => {},
    [fetchUser.rejected]: (state, action) => {},
  },
});

export const { updateUserInfo, notifCount, addFF } = userSlice.actions;

export default userSlice.reducer;
