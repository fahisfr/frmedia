import AddPost from "../components/addPost/AddPost";
import Post from "../components/post/Post";
import MainLayout from "../layouts/Main";
import { HomeQuery } from "../graphql/qurey";
import { useQuery } from "@apollo/client";


function Home({}) {
  const { data, loading, error } = useQuery(HomeQuery);
 

  return (
    <>
      <AddPost />
      {data &&
        data.home.posts.map((item, index) => {
          return <Post post={item} key={index} />;
        })}
    </>
  );
}

Home.PageLayout = MainLayout;

export default Home;
