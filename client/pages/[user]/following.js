import FollowAndFollowing from "../../components/followAndFollowing";
import ProfileLayout from "../../layouts/Profile";

function Following() {
  return (
    <>
      <FollowAndFollowing />
    </>
  );
}
Following.PageLayout = ProfileLayout;
export default Following;
