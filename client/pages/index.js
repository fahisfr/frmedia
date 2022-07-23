import styles from "../styles/index.module.css";
import Header from "../components/header/Header.js";
import AddPost from "../components/addPost/AddPost";
import Post from "../components/post/Post";
import Leftbar from "../components/leftBar/LeftBar";
import RightBar from "../components/rightBar/RightBar";

function Home() {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <Leftbar />
        <div className="center">
          <AddPost />
          <Post />
        </div>
        <RightBar />
      </main>
    </div>
  );
}

export default Home;
