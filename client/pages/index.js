import styles from "../styles/index.module.css";
import Header from "../components/header/Header.js";
import AddPost from "../components/addPost/AddPost";
import Post from "../components/post/Post";
import Leftbar  from "../components/leftBar/LeftBar";
import RightBar from "../components/rightBar/RightBar";

function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <Leftbar />
        </div>
        <div className={styles.center}>
          <AddPost />
          <Post/>
        </div>

        <div className={styles.right}>
          <RightBar />
        </div>
      </main>
    </div>
  );
}

export default Home;
