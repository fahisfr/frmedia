import axios from "../axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNotifications = createAsyncThunk(
  "user/fetchNotifications",
  async () => {
    const { data } = await axios.get("/notifications");
    return data;
  }
);

const notificationsSlice = createSlice({
  name: "user",
  initialState: {
    notifications: [],
    loading: false,
    error: null,
    fetched: false,
  },
  reducers: {},
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, { payload }) => {
      if (payload.status === "ok") {
        state.notifications = payload.notifications.map((res) => {
          switch (res.type) {
            case "mention":
              res.message = "Was mentioned in a post";
              res.link = res.postId;
              break;
            case "liked":
              res.message = " Liked you post";
              res.link = `/post/${res.postId}`;
              break;
            case "following":
              res.message = "Started following you";
              res.link = res.userId;
            default:
              res.message = "";
          }
          return res;
        });
        state.fetched = true;
        state.loading = false;
      }
    },
    [fetchNotifications.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchNotifications.rejected]: (state, action) => {
      state.error = "opps somthing went wrong";
    },
  },
});

export const { updateUserInfo } = notificationsSlice.actions;

export default notificationsSlice.reducer;
