import React from "react";
import Profile from "../../components/profile/Profile";
import MainLayout from "../../layouts/Main";

function Index() {
  return (
    <>
      <Profile />
    </>
  );
}

Index.PageLayout = MainLayout;

export default Index;
