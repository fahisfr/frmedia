import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import MainLayout from "../layouts/Main";
import { useDispatch, useSelector } from "react-redux";
import { fetchExplore } from "../features/posts";
import JustLoading from "../components/JustLoading";
import ErrorMessage from "../components/ErrorMessage";
function explore() {
  const dispatch = useDispatch();
  const {
    exploreLoading: loading,
    exploreError: error,
    exploreFetched,
    posts,
  } = useSelector((state) => state.posts);

  useEffect(() => {
    if (!exploreFetched && !error) {
      dispatch(fetchExplore());
    }
  }, []);
  return (
    <div className="center">
      {error ? (
        <ErrorMessage error={error} />
      ) : loading ? (
        <JustLoading />
      ) : (
        posts
          .filter((post) => post.page === "explore")
          .map(({ userInfo, ...post }) => {
            return <Post postInfo={post} userInfo={userInfo} />;
          })
      )}
    </div>
  );
}
explore.PageLayout = MainLayout;
export default explore;
