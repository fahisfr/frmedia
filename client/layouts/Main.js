import RightBar from "../components/RightBar";
import LeftBar from "../components/LeftBar";
import daynamic from "next/dynamic";
import { useEffect, useState } from "react";
import useTheme from "../hooks/useTheme";
const Header = daynamic(() => import("../components/Header"), { ssr: false });

function Main(page) {
  const [theme, setTheme] = useTheme();

  return (
    <div className="main_layout" data-theme={theme}>
      <Header theme={theme} setTheme={setTheme} />
      <main className="main">
        <LeftBar />
        <div className="center">{page}</div>
        <RightBar />
      </main>
    </div>
  );
}

export default Main;
