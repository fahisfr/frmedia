import { useEffect, useState } from "react";
import Header from "../components/Header";
import RightBar from "../components/RightBar";
import LeftBar from "../components/LeftBar";
import { useSelector } from "react-redux";
import axios from "../axios";
import JustLoading from "../components/JustLoading";

function Main(page) {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <LeftBar />
        <div className="center">{page ? page : <JustLoading />}</div>
        <RightBar />
      </main>
    </div>
  );
}

export default Main;
