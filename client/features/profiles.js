import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postReducers from "./reducers/post";

const profileSlice = createSlice({
  name: "profile",
  initialState: [],
  reducers: {
    addProfile: (state, { payload }) => {
      state.push(payload);
    },

    follow: (state, { payload }) => {
      try {
        for (profile of state.profiles) {
          if (profile._id === payload._id) {
            profile._following = !profile._following;
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    // likePost: (state, { payload }) => {
    //   for (let profile of state) {
    //     if (profile.userName === payload.userName) {
    //       for (let post of profile.posts) {
    //         if (post._id === payload.postId) {
    //           const { liked, likesCount } = post;
    //           post.likesCount = liked ? likesCount - 1 : likesCount + 1;
    //           post.liked = !liked;
    //           break;
    //         }
    //       }
    //       break;
    //     }
    //   }
    // },
    // setComments: (state, { payload }) => {
    //   // for (let {userName,posts} of state){
    //   //   if (profile.userName === payload.userName){

    //   //   }
    //   // }
    //   for (let { userName, posts } of state) {
    //     if (userName === payload.userName) {
    //       for (let post of posts) {
    //         if (post._id === payload.postId) {
    //           post.comments = payload.comments;
    //           break;
    //         }
    //       }
    //       break;
    //     }
    //   }
    // },
    // likeComment: (state, { payload }) => {
    //   console.log(payload);
    //   for (let { userName, posts } of state) {
    //     console.log(userName, payload.userName);
    //     if (userName === payload.userName) {
    //       console.log("yes");
    //       for (let post of posts) {
    //         if (post._id === payload.postId) {
    //           for (let comment of post.comments) {
    //             if (comment._id === payload.commentId) {
    //               const { likesCount, liked } = comment;
    //               comment.likesCount = liked ? likesCount - 1 : likesCount + 1;
    //               comment.liked = !liked;
    //               break;
    //             }
    //           }
    //           break;
    //         }
    //       }
    //       break;
    //     }
    //   }
    // },
  },
});

export const actions = profileSlice.actions;

export default profileSlice.reducer;
