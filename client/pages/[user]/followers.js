
import FollowAndFollowing from "../../components/followAndFollowing";
import ProfileLayout from "../../layouts/Profile";
function Followers() {
  return (
    <>
      <FollowAndFollowing />
    </>
  );
}

Followers.PageLayout = ProfileLayout;

export default Followers;
