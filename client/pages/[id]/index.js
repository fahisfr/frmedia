import React from "react";
import Profile from "../../components/Profile";
import MainLayout from "../../layouts/Main";
import JustLoading from "../../components/JustLoading";
import { useQuery } from "@apollo/client";
import { GET_USERINFO } from "../../graphql/qurey";

function Index({ userName }) {
  const { data, loading, error } = useQuery(GET_USERINFO, {
    variables: {
      userName,
    },
  });

  return (
    <>{loading ? <JustLoading /> : <Profile userInfo={data.getUserInfo} />}</>
  );
}

Index.PageLayout = MainLayout;

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      userName: query.id,
    },
  };
};

export default Index;
