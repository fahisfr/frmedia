

import MainLayout from "./Main";
import Profilev from "../components/Profile";

function Profile(page) {
  return MainLayout(
    <>
      <Profilev /> 
      {page}
    </>
  );
}

export default Profile;
