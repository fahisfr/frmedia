import { configureStore } from "@reduxjs/toolkit";
import user from "./user";

function store() {
  return configureStore({
    reducer: {
      user
    },
    devTools: process.env.NODE_ENV === "development",
  });
}

export default store;
