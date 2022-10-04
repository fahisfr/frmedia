import RightBar from "../components/RightBar";
import LeftBar from "../components/LeftBar";
import daynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Header = daynamic(() => import("../components/Header"), { ssr: false });

function Main(page) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="container" data-theme={darkMode ? "dark" : "light"}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="main">
        <LeftBar />
        <div className="center">{page}</div>
        <RightBar />
      </main>
    </div>
  );
}

export default Main;
