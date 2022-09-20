import React, { useEffect, useState } from "react";
import Posts from "../../../components/Post";
import AddPost from "../../../components/AddPCR";
import Comment from "../../../components/Comment";
import JustLoading from "../../../components/JustLoading";
import MainLayout from "../../../layouts/Main";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../features/home";
import axios from "../../../axios";
import { useRouter } from "next/router";

import ErrorMessage from "../../../components/ErrorMessage";
function Post() {
  const router = useRouter();
  const { setComments, addPost } = actions;
  const {
    query: { postId },
  } = router;
  const dispatch = useDispatch();

  const [failedFetchPost, setFailedFetchPost] = useState(false);
  const [failedFetchComments, setFailedFetchComments] = useState(false);
  const [loadign, setLoading] = useState(true);

  const posts = useSelector((state) => state.home.posts);
  console.log(posts);
  const post = posts.find((post) => post._id === postId);

  useEffect(() => {
    const getPost = async () => {
      try {
        if (!post) {
          const { data } = await axios.get(`/post/${postId}`);

          if (data.status === "ok") {
            dispatch(addPost({ post: data.post }));
            setLoading(false);
          } else {
            setFailedFetchPost(data.error);
          }
        } else if (!post.comments) {
          const { data } = await axios.get(`/post/comments/${postId}`);
          if (data.status === "ok") {
            dispatch(setComments({ postId, comments: data.comments }));
          } else {
            setFailedFetchComments(data.error);
          }
        }
      } catch (err) {
        setFailedFetchPost("failed To fetch Post");
      } 
    };
    getPost();
  }, []);

  if (loadign) {
    <JustLoading />;
  }

  if (failedFetchPost) {
    return <ErrorMessage error={failedFetchPost} />;
  }

  return (
    <>
      <Posts postInfo={post} userInfo={post.userInfo} vpost page="home" />
      {/* <AddPost For="post" postId={postId} page="home" /> */}
      {failedFetchComments ? (
        <ErrorMessage error={failedFetchComments} />
      ) : post.comments ? (
        post?.comments?.map((comment) => {
          return (
            <Comment key={comment._id} comment={comment} postId={postId} />
          );
        })
      ) : (
        <JustLoading />
      )}
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      postId: query.postId,
    },
  };
};

Post.PageLayout = MainLayout;
export default Post;
