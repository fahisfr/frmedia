import React, { useEffect } from "react";
import AddPost from "../components/AddPCR";
import Post from "../components/Post";
import MainLayout from "../layouts/Main";
import JustLoading from "../components/JustLoading";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/posts";
import axios from "../axios";
function Home({}) {
  const { error, loading, posts } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch]);

  return (
    <>
      <AddPost For="post" />
      {loading ? (
        <JustLoading />
      ) : (
        < >
          {posts.map(({ userInfo, ...post }, index) => {
            return <Post postInfo={post} userInfo={userInfo} scroll={false} key={post._id} />;
          })}
        </>
      )}
    </>
  );
}

Home.PageLayout = MainLayout;
export default Home;
