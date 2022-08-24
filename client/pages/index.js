import React, { useEffect } from "react";
import AddPost from "../components/AddPCR";
import Post from "../components/Post";
import MainLayout from "../layouts/Main";
import JustLoading from "../components/JustLoading";

function Home({}) {
  return (
    <>
      <AddPost For="post" />
      {/* <Post userInfo={userInfo} postInfo={postInfo} key={index} />;
       */}
    </>
  );
}

export const getServerSideProps = async (req) => {

  
  return{
    props:{
      
    }
  }

};

Home.PageLayout = MainLayout;
export default Home;
