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
import AddPCR from "../../../components/AddPCR";

import ErrorMessage from "../../../components/ErrorMessage";
function Post() {
  const router = useRouter();
  const { setComments, addPost } = actions;
  const {
    query: { postId },
    isReady,
  } = router;
  const dispatch = useDispatch();

  const [failedFetchPost, setFailedFetchPost] = useState(false);
  const [failedFetchComments, setFailedFetchComments] = useState(false);
  const [loading, setLoading] = useState(true);

  const posts = useSelector((state) => state.home.posts);

  const post = posts.find((post) => post._id === postId);

  useEffect(() => {
    const getPost = async () => {
      if (!isReady) return;
      try {
        if (!post) {
          const { data } = await axios.get(`/post/${postId}`);

          if (data.status === "ok") {
            dispatch(addPost({ post: data.post }));
          } else {
            setFailedFetchPost(data.error);
          }
        } else if (!post.comments) {
          if (post.commentsCount === 0) {
            dispatch(setComments({ postId, comments: [] }));
          } else {
            const { data } = await axios.get(`/post/comments/${postId}`);
            if (data.status === "ok") {
              dispatch(setComments({ postId, comments: data.comments }));
            } else {
              setFailedFetchComments(data.error);
            }
          }
        }
      } catch (err) {
        setFailedFetchPost("failed To fetch Post");
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [isReady]);

  if (loading) {
    return <JustLoading />;
  }

  if (failedFetchPost) {
    return <ErrorMessage error={failedFetchPost} />;
  }

  return (
    <>
      <Posts postInfo={post} userInfo={post.userInfo} sliceName="home" />
      <AddPCR For="comment" sliceName="home" />
      {failedFetchComments ? (
        <ErrorMessage error={failedFetchComments} />
      ) : post?.comments ? (
        post.comments.length > 0 ? (
          post.comments.map((comment) => {
            return (
              <Comment
                key={comment._id}
                comment={comment}
                postId={postId}
                sliceName="home"
              />
            );
          })
        ) : (
          <div className="no_comments">
            <span className="no_c_text">No Comments</span>
          </div>
        )
      ) : (
        <JustLoading />
      )}
    </>
  );
}

Post.PageLayout = MainLayout;
export default Post;
