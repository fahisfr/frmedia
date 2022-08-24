import React from "react";
import Profile from "../../components/Profile";
import MainLayout from "../../layouts/Main";
import { aixosSSR } from "../../axios";

function Index({ userInfo }) {
  return (
    <>
      <Profile userInfo={userInfo}></Profile>
    </>
  );
}

Index.PageLayout = MainLayout;

export const getServerSideProps = async ({ req, query }) => {
  const res = await aixosSSR(req, `user/${query.id}`);
  return {
    props: {
      ...res,
    },
  };
};

export default Index;
