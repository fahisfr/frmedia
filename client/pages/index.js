import React, { useEffect } from "react";
import AddPost from "../components/AddPCR";
import Post from "../components/Post";
import MainLayout from "../layouts/Main";
import JustLoading from "../components/JustLoading";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/home";
import ErrorMessage from "../components/ErrorMessage";

function Home({}) {
  const { loading, error, homeFetched, posts } = useSelector(
    (state) => state.home
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (!homeFetched && !loading) {
      dispatch(fetchPosts());
    }
  }, []);

  return (
    <>
      <AddPost For="post" page="home" />
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
                page="home"
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
