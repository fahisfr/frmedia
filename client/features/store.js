import React from "react";
import { configureStore } from "@reduxjs/toolkit";

function store() {
  return configureStore({
    reducer: {},
    devTools: process.env.NODE_ENV === "development",
  });
}

export default store;
