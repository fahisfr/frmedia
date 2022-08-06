import React from "react";
import Post from "../../../../components/post/Post";
import AddPost from "../../../../components/addPost/AddPost";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import MainLayout from "../../../../layouts/Main";

const GET_POST = gql`
  query getPost($postId: String!) {
    getPost(postId: $postId) {
      _id
      content
      file{
       type
       name
      }
      likes
      comments
      postAt
      editedAt
    }
  }
`;

function Postv() {
  const router = useRouter();

  const { postId } = router.query;

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId :`${postId}`},
  });


  return (
    <>
      {data && <Post post={data} />}
      <AddPost />
    </>
  );
}

Postv.PageLayout = MainLayout;


export default Postv;
