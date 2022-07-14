import styles from "../styles/index.module.css";
import Header from "../components/header/header.js";
import AddPost from "../components/addPost/AddPost";
import Post from "../components/post/Post";

function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.left}>

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
