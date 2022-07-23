import React from "react";
import Header from "../../../../components/header/Header";
import LeftBar from "../../../../components/leftBar/LeftBar";
import RightBar from "../../../../components/rightBar/RightBar";
import Post from "../../../../components/post/Post";
import AddPost from "../../../../components/addPost/AddPost";
function Commands() {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <LeftBar />
        <div className="center">
          <Post />
          <AddPost  />
          <Post />
        </div>
        <RightBar />
      </main>
    </div>
  );
}

export default Commands;
