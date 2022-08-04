import Header from "../components/header/Header";
import RightBar from "../components/rightBar/RightBar";
import LeftBar from "../components/leftBar/LeftBar";
import { useRouter } from "next/router";
import AddPost from "../components/addPost/AddPost";
import Post from "../components/post/Post";
function Main(page) {
  const router = useRouter();

  return (
    <div className="container">
      <Header />
      <main className="main">
        <LeftBar />
        <div className="center">{page}</div>
        <RightBar />
      </main>
    </div>
  );
}

export default Main;
