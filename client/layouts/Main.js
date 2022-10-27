import { useState } from "react";
import RightBar from "../components/RightBar";
import LeftBar from "../components/LeftBar";
import daynamic from "next/dynamic";
import MLeftBar from "../components/MLeftBar";
import useTheme from "../hooks/useTheme";
import useLeftBar from "../hooks/useLeftBar";
const Header = daynamic(() => import("../components/Header"), { ssr: false });

function Main(page) {
  const [theme, setTheme] = useTheme();
  const [leftBar, setLeftBar] = useLeftBar();

  return (
    <div className="main_layout" data-theme={theme}>
      <Header theme={theme} setTheme={setTheme} setLeftBar={setLeftBar} />
      <main className="main">
        <LeftBar />
        {leftBar && <MLeftBar trigger={leftBar} setTrigger={setLeftBar} />}
        <div className="center">{page}</div>
        <RightBar />
      </main>
    </div>
  );
}

export default Main;
