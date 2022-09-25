import RightBar from "../components/RightBar";
import LeftBar from "../components/LeftBar";
import daynamic from "next/dynamic";
import { useEffect } from "react";
const Header = daynamic(() => import("../components/Header"), { ssr: false });

function Main(page) {

  return (
    <div className="container">
      <Header />
      <main className="main">
        <LeftBar />
        <div className="center">{page}</div>
        <RightBar />
      </main>
    </div>
  );
}

export default Main;
