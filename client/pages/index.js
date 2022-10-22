import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import Post from "../components/Post";
import MainLayout from "../layouts/Main";
import JustLoading from "../components/JustLoading";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/home";
import ErrorMessage from "../components/ErrorMessage";
import Head from "next/head";

const AddPost = dynamic(() => import("../components/AddPCR"));

export async function getServerSideProps(context) {
  const token = context.req.cookies.auth_token;

  if (token) {
    return {
      props: {},
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
  };
}

function Home({}) {
  const { loading, error, fetched, posts } = useSelector((state) => state.home);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!fetched) {
      dispatch(fetchPosts());
    }
  }, [dispatch]);

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="singIn with email or google and join with us"></meta>
        <meta name="keywords" content="frmedia"></meta>
      </Head>
      {error ? (
        <ErrorMessage error={error} />
      ) : loading ? (
        <JustLoading />
      ) : (
        <>
          <AddPost For="post" sliceName="home" />
          {posts.map(({ userInfo, ...post }, index) => {
            return <Post postInfo={post} userInfo={userInfo} key={index} sliceName="home" />;
          })}
        </>
      )}
    </div>
  );
}

Home.PageLayout = MainLayout;
export default Home;
