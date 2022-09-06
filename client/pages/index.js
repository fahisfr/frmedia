import React, { useEffect } from "react";
import AddPost from "../components/AddPCR";
import Post from "../components/Post";
import MainLayout from "../layouts/Main";
import JustLoading from "../components/JustLoading";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/posts";
import ErrorMessage from "../components/ErrorMessage";

import {
  addReply,
  setComments,
  addComment,
  setReplies,
  likePost,
  likeReply,
  likeComment,
} from "../features/posts";

function Home({}) {
  const {
    homeLoading: loading,
    homeError: error,
    homeFetched,
    posts,
  } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!homeFetched) {
      dispatch(fetchPosts());
    }
  }, [dispatch]);

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
              return (
                <Post
                  postInfo={post}
                  userInfo={userInfo}
                  addReply={addReply}
                  setComments={setComments}
                  addComment={addComment}
                  setReplies={setReplies}
                  likePost={likePost}
                  likeReply={likeReply}
                  likeComment={likeComment}
                  key={post._id}
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
