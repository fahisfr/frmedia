import { useEffect, useState } from "react";
import Header from "../components/Header";
import RightBar from "../components/RightBar";
import LeftBar from "../components/LeftBar";
import { useSelector } from "react-redux";
import axios from "../axios";

function Main(page) {
 

  return (
    <div className="container">
      <Header />
      <main className="main">
        <LeftBar />
        <div className="center">{page}</div>
        <RightBar  />
      </main>
    </div>
  );
}

export default Main;
