import React from "react";
import Post from "../../../../components/Post";
import AddPost from "../../../../components/AddPCR";
import Comment from "../../../../components/Comment";
import { useQuery, gql } from "@apollo/client";
import MainLayout from "../../../../layouts/Main";
import { GET_POST } from "../../../../graphql/qurey";
import JustLoading from "../../../../components/JustLoading";

function Postv({ postId }) {
  const { data, error, loading } = useQuery(GET_POST, {
    variables: {
      postId,
    },
    onCompleted: (data) => {},
  });

  return (
    <>
      {loading ? (
        <JustLoading />
      ) : (
        <>
          <Post post={data.getPost} />
          <AddPost For="comment" postId={postId} />
          {data?.getPost?.comments?.map((comment, index) => {
            return <Comment key={index} comment={comment} postId={postId} For="comment" />;
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

Postv.PageLayout = MainLayout;
export default Postv;
