import React, { useState, useEffect } from "react";

import MainLayout from "./Main";

import Profilev from "../components/Profile";

function Profile(page) {
  return MainLayout(
    <>
      {page}
      <Profilev />
    </>
  );
}

export default Profile;
