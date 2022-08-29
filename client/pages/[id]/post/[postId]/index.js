import React from "react";
import Posts from "../../../../components/Post";
import AddPost from "../../../../components/AddPCR";
import Comment from "../../../../components/Comment";
import JustLoading from "../../../../components/JustLoading";
import MainLayout from "../../../../layouts/Main";
import { useDispatch, useSelector } from "react-redux";

function Post({ postId }) {
  const loading = true;

  const posts = useSelector((state) => state.posts.posts);

  const post = posts.find((post) => post._id === postId);

  const getComments = () => {
    if (posts.comments) return posts.comments;
    const { data } = axios.get(`/post/comments/${postId}`);
    if (data.status==="ok"){
      
    }
  };

  return (
    <>
      {false ? (
        <JustLoading />
      ) : (
        <>
          <Posts postInfo={post} userInfo={post.userInfo} />
          <AddPost For="comment" postId={postId} />
          {post?.comments?.map((comment, index) => {
            return (
              <Comment
                key={index}
                comment={comment}
                postId={postId}
                For="comment"
              />
            );
          })}
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
