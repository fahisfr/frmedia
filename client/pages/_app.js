import "../styles/globals.css";
import React from "react";
import { fetchUser } from "../features/user";
import { Provider } from "react-redux";
import user from "../features/user";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user,
  },
  devTools: process.env.NODE_ENV === "development",
});
store.dispatch(fetchUser())
function MyApp({ Component, pageProps }) {
  const getLayout = Component.PageLayout || ((page) => page);

  return (
    <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
  );
}

export default MyApp;
