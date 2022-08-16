import React, { useEffect } from "react";
import AddPost from "../components/AddPCR";
import Post from "../components/Post";
import MainLayout from "../layouts/Main";
import { HomeQuery } from "../graphql/qurey";
import { useQuery } from "@apollo/client";
import JustLoading from "../components/JustLoading";

function Home({}) {
  const { data, loading, error } = useQuery(HomeQuery);


  return (
    <>
      <AddPost For="post" />
      {data &&
        data.home.posts.map((item, index) => {
          return <Post post={item} key={index} />;
        })}
    </>
  );
}

Home.PageLayout = MainLayout;

export default Home;
