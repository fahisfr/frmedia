import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import Post from "../components/Post";
import MainLayout from "../layouts/Main";
import JustLoading from "../components/JustLoading";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/home";
import ErrorMessage from "../components/ErrorMessage";

const AddPost = dynamic(() => import("../components/AddPCR"));

function Home({}) {
  const { loading, error, fetched, posts } = useSelector(
    (state) => state.home
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (!fetched && !loading) {
      dispatch(fetchPosts());
    }
  }, []);

  return (
    <>
      <AddPost For="post" sliceName="home" />
      {error ? (
        <ErrorMessage error={error} />
      ) : loading ? (
        <JustLoading />
      ) : (
        <>
          {posts.map(({ userInfo, ...post }, index) => {
            return (
              <Post
                postInfo={post}
                userInfo={userInfo}
                key={index}
                sliceName="home"
              />
            );
          })}
        </>
      )}
    </>
  );
}

Home.PageLayout = MainLayout;
export default Home;
