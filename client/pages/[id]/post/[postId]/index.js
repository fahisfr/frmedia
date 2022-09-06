import React, { useEffect, useState } from "react";
import Posts from "../../../../components/Post";
import AddPost from "../../../../components/AddPCR";
import Comment from "../../../../components/Comment";
import JustLoading from "../../../../components/JustLoading";
import MainLayout from "../../../../layouts/Main";
import { useDispatch, useSelector } from "react-redux";
import { setComments, addPost, addComment } from "../../../../features/posts";
import axios from "../../../../axios";
import { useRouter } from "next/router";

import ErrorMessage from "../../../../components/ErrorMessage";
function Post({postId}) {
  const router = useRouter();
  // const {
  //   query: { postId },
  // } = router;
  const dispatch = useDispatch();

  const [failedFetchPost, setFailedFetchPost] = useState(false);
  const [failedFetchComments, setFailedFetchComments] = useState(false);

  const [error, setError] = useState({
    failedFetchPost: false,
    failedFetchComments: false,
  });

  const posts = useSelector((state) => state.posts.posts);
  
  const post = posts.find((post) => post._id === postId);

  useEffect(() => {
    const getPost = async () => {
      try {
        if (!post) {
          const { data } = await axios.get(`/post/${postId}`);

          if (data.status === "ok") {
            console.log(data)
            dispatch(addPost(data.post));
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
        console.log(err);
        setFailedFetchPost("failed To fetch Post");
      }
    };
    getPost();
  },[]);

  return (
    <>
      {failedFetchPost ? (
        <ErrorMessage error={failedFetchPost} />
      ) : !post ? (
        <JustLoading />
      ) : (
        <>
          <Posts postInfo={post} userInfo={post.userInfo} vpost />
          <AddPost For="comment" postId={postId} />
          {failedFetchComments ? (
            <ErrorMessage error={failedFetchComments} />
          ) : post.comments ? (
            post?.comments?.map((comment) => {
              return (
                <Comment
                  key={comment._id}
                  comment={comment}
                  postId={postId}
                  For="comment"
                />
              );
            })
          ) : (
            <JustLoading />
          )}
        </>
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
