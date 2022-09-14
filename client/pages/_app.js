import "../styles/globals.css";
import React from "react";

import { fetchUser } from "../features/user";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import user from "../features/user";
import posts from "../features/posts";
import notifications from "../features/notifications";
import explore from "../features/explore";
import hashTags from "../features/hashTags";
import profiles from "../features/profiles";

const store = configureStore({
  reducer: {
    user,
    posts,
    notifications,
    explore,
    hashTags,
    profiles
  },
});
store.dispatch(fetchUser());
function MyApp({ Component, pageProps }) {
  const getLayout = Component.PageLayout || ((page) => page);

  return (
    <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
  );
}

export default MyApp;
