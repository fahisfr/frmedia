import React from "react";
import Header from "../../components/header/Header";
import LeftBar from "../../components/leftBar/LeftBar";
import RightBar from "../../components/rightBar/RightBar";
import Profile from "../../components/profile/Profile";

function index() {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <LeftBar />
        <Profile />
        <RightBar />
      </main>
    </div>
  );
}

export default index;
