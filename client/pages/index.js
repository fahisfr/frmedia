import styles from "../styles/index.module.css";
import Header from "../components/header/Header.js";
import AddPost from "../components/addPost/AddPost";
import Post from "../components/post/Post";
import Sidebar  from "../components/sideBar/Sidebar";

function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.center}>
          <AddPost />
          <Post/>
        </div>

        <div className={styles.right}>
          <div></div>
          <div></div>
        </div>
      </main>
    </div>
  );
}

export default Home;
