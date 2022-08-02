import React from "react";
import Profile from "../../components/profile/Profile";
import MainLayout from "../../layouts/Main";

function index() {
  return (
    <>
      <Profile />
    </>
  );
}

index.PageLayout = MainLayout;

export default index;
