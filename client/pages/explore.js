import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import MainLayout from "../layouts/Main";
import { useDispatch, useSelector } from "react-redux";
import { fetchExplore } from "../features/explore";
import JustLoading from "../components/JustLoading";
import ErrorMessage from "../components/ErrorMessage";
function Explore() {
  const dispatch = useDispatch();
  const { loading, error, fetched, posts } = useSelector(
    (state) => state.explore
  );

  useEffect(() => {
    if (!fetched && !error) {
      dispatch(fetchExplore());
    }
  }, [dispatch]);

  return (
    <>
      {error ? (
        <ErrorMessage error={error} />
      ) : loading ? (
        <JustLoading />
      ) : (
        posts.map(({ userInfo, ...post }, index) => {
          return (
            <Post
              postInfo={post}
              userInfo={userInfo}
              sliceName="explore"
              key={index}
            />
          );
        })
      )}
    </>
  );
}
Explore.PageLayout = MainLayout;
export default Explore;
