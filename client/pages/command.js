import React from "react";
import Header from "../components/header/Header";
import LeftBar from "../components/leftBar/LeftBar";
import RightBar from "../components/rightBar/RightBar";

import Command from "../components/commands/Commands";
function Commands() {
  return (
    <div className="container">
     <Header />
      <main className="main">
        <LeftBar />
        <Command />
        <RightBar />
      </main>
    </div>
  );
}

export default Commands;
