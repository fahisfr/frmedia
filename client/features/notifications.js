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
        state.notifications = payload.notifications.map((item) => {
          switch (item.type) {
            case "mention":
              item.message = "Was mentioned in a post";
              item.link = item.postId;
              break;
            case "liked":
              item.message = " Liked you post";
              item.link = `/post/${item.postId}`;
              break;
            case "following":
              item.message = "Started following you";
              item.link = item.userName;
            default:
              item.message = "";
          }
          return item;
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
