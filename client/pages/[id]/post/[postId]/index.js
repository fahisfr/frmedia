import React from "react";
import Post from "../../../../components/post/Post";
import AddPost from "../../../../components/addPost/AddPost";
import { useQuery, gql } from "@apollo/client";
import MainLayout from "../../../../layouts/Main";
import { GET_POST } from "../../../../graphql/qurey";
import JustLoading from "../../../../components/justLoading/JustLoading";

function Postv({ postId }) {
  const { data, error, loading } = useQuery(GET_POST, {
    variables: {
      postId,
    },
  });

  return (
    <>
      {loading ? (
        <JustLoading />
      ) : (
        <>
          <Post post={data?.getPost} />
          <AddPost comment={true} id={postId} />

          {data?.getPost?.comments?.map((comment, key) => {
            <Post key={index} post={comment} />;
          })}
        </>
      )}
      ;
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
