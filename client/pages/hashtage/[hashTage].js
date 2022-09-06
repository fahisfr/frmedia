import React, { useEffect, useState } from "react";
import axios from "../../axios";
import Post from "../../components/Post";
import MainLayout from "../../layouts/Main";
import { useRouter } from "next/router";
import { addTagedPosts } from "../../features/posts";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import JustLoading from "../../components/JustLoading";

function Tage() {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    isReady,
    query: { hashTage },
  } = useRouter();

  const { posts, fetchedHashTags } = useSelector((state) => state.posts);

  useEffect(() => {
    try {
      if (!isReady) return;
      const getPost = async () => {
        const { data } = await axios.get(`/hashtage/${hashTage}`);
        if (data.status === "ok") {
          dispatch(addTagedPosts({ hashTage, posts: data.posts }));
        } else {
          setError(data.error);
        }
      };

      if (!fetchedHashTags[hashTage]) {
        getPost();
      }
    } catch (err) {
      setError("oops somthin went wor:(");
    }
  }, [isReady, hashTage]);

  if (loading) {
    return <loading />;
  }

  return (
    <div className="center">
      {error ? (
        <ErrorMessage error={error} />
      ) : loading ? (
        <JustLoading />
      ) : (
        posts
          .filter((post) => post.tage === hashTage)
          .map(({ userInfo, ...post }) => {
            return <Post postInfo={post} userInfo={userInfo} />;
          })
      )}
    </div>
  );
}
Tage.PageLayout = MainLayout;
export default Tage;
