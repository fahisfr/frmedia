import React, { useEffect, useState } from "react";
import axios from "../../axios";
import Post from "../../components/Post";
import MainLayout from "../../layouts/Main";
import { useRouter } from "next/router";
import { actions } from "../../features/hashTags";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import JustLoading from "../../components/JustLoading";

function Tage() {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const {
    isReady,
    query: { hashTage },
  } = useRouter();

  const { posts, fetchedHashTags } = useSelector((state) => state.hashTags);

  useEffect(() => {
    if (!isReady) return;
    try {
      const getPost = async () => {
        const { data } = await axios.get(`/hashtage/${hashTage}`);
        if (data.status === "ok") {
          dispatch(actions.addTagedPosts({ hashTage, posts: data.posts }));
        } else {
          setError(data.error);
        }
      };

      if (!fetchedHashTags.find((tage) => tage === hashTage)) {
       
        getPost();
      }
    } catch (err) {
      console.log(err);
      setError("oops somthin went wrong:(");
    } finally {
      setLoading(false);
    }
  }, [isReady, hashTage]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading) {
    return <JustLoading />;
  }

  return (
    <>
      {posts
        .filter((post) => post.tage === hashTage)
        .map(({ userInfo, ...post }, index) => {
          return (
            <Post
              postInfo={post}
              userInfo={userInfo}
              sliceName="hashTage"
              key={index}
            />
          );
        })}
    </>
  );
}
Tage.PageLayout = MainLayout;
export default Tage;
