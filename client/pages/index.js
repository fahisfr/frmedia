import React, { useEffect } from "react";
import AddPost from "../components/AddPCR";
import Post from "../components/Post";
import MainLayout from "../layouts/Main";
import { HomeQuery } from "../graphql/qurey";
import { useApolloClient, useQuery } from "@apollo/client";
import JustLoading from "../components/JustLoading";
import {HOME} from "../graphql/qurey";

function Home({}) {

  const { data, loading, error } = useQuery(HOME);

  

  return (
    <>
      <AddPost For="post" />
      {data &&
        data.home.posts.map(({userInfo,...postInfo}, index) => {
          return <Post userInfo={userInfo} postInfo={postInfo} key={index} />;
        })}
    </>
  );
}

Home.PageLayout = MainLayout;
export default Home;
