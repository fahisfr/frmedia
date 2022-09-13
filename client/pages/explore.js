import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import MainLayout from "../layouts/Main";
import { useDispatch, useSelector } from "react-redux";
import { fetchExplore } from "../features/explore";
import JustLoading from "../components/JustLoading";
import ErrorMessage from "../components/ErrorMessage";
function explore() {
  const dispatch = useDispatch();
  const { loading, error, fetched, posts } = useSelector(
    (state) => state.explore
  );

  useEffect(() => {
    if (!fetched && !error) {
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
        posts.map(({ userInfo, ...post }, index) => {
          return (
            <Post
              postInfo={post}
              userInfo={userInfo}
              page="explore"
              key={index}
            />
          );
        })
      )}
    </div>
  );
}
explore.PageLayout = MainLayout;
export default explore;
