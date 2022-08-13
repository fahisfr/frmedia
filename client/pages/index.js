import React ,{ useEffect } from "react";
import AddPost from "../components/addPost/AddPost";
import Post from "../components/post/Post";
import MainLayout from "../layouts/Main";
import { HomeQuery } from "../graphql/qurey";
import { useQuery } from "@apollo/client";
import JustLoading from "../components/justLoading/JustLoading";



function Home({}) {

      const { data, loading, error } = useQuery(HomeQuery);

  useEffect(()=>{
 
  })

  return (
    <>
      <AddPost />
      {data &&
        data.home.posts.map((item, index) => {
          return <Post post={item} key={index} />;
        })}
    </>
  );
}

Home.PageLayout = MainLayout;

export default Home;
