import styles from "../styles/index.module.css";
import AddPost from "../components/addPost/AddPost";
import Post from "../components/post/Post";

import MainLayout from "../layouts/Main";

function Home() {
  return (
    <>
      <AddPost />
      {new Array(10).fill(0).map((_, index) => {
        return <Post key={index} />;
      })}
      <Post />
    </>
  );
}

Home.PageLayout = MainLayout;

export default Home;
