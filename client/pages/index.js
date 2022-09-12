import React, { useEffect } from "react";
import AddPost from "../components/AddPCR";
import Post from "../components/Post";
import MainLayout from "../layouts/Main";
import JustLoading from "../components/JustLoading";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/posts";
import ErrorMessage from "../components/ErrorMessage";

function Home({}) {
  const {
    homeLoading: loading,
    homeError: error,
    homeFetched,
    posts,
  } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!homeFetched && !loading) {
      dispatch(fetchPosts());
    }
  }, []);


  console.log(process.env.ok)
  return (
    <>
      <AddPost For="post" />
      {error ? (
        <ErrorMessage error={error} />
      ) : loading ? (
        <JustLoading />
      ) : (
        <>
          {posts
            .filter((post) => post.page === "home")
            .map(({ userInfo, ...post }, index) => {
              return <Post postInfo={post} userInfo={userInfo} key={index} />;
            })}
        </>
      )}
    </>
  );
}

Home.PageLayout = MainLayout;
export default Home;
