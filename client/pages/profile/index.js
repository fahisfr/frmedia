import React from "react";
import { useState } from "react";
import styles from "./styles.module.css";
import Header from "../../components/header/Header";
import LeftBar from "../../components/leftBar/LeftBar";
import RightBar from "../../components/rightBar/RightBar";
import Profile from "../../components/profile/Profile";
function index() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <LeftBar />
        <Profile />
        <RightBar />
      </main>
    </div>
  );
}

export default index;
