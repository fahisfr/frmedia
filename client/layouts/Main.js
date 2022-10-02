import RightBar from "../components/RightBar";
import LeftBar from "../components/LeftBar";
import daynamic from "next/dynamic";
import { useEffect } from "react";
import { useState } from "react";
const Header = daynamic(() => import("../components/Header"), { ssr: false });

function Main(page) {
  const [dark, setDark] = useState(true);
  return (
    <div className="container" data-theme={`${dark ? "dark" : ""}`}>
      <Header dark={dark} setDark={setDark} />
      <main className="main">
        <LeftBar />
        <div className="center">{page}</div>
        <RightBar />
      </main>
    </div>
  );
}

export default Main;
