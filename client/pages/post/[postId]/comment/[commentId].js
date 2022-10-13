import { useState, useEffect } from "react";
import Comments from "../../../../components/Comment";
import Reply from "../../../../components/Reply";
import MainLayout from "../../../../layouts/Main";
import ErrorMessage from "../../../../components/ErrorMessage";
import JustLoading from "../../../../components/JustLoading";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../../features/home";
import axios from "../../../../axios";
import { useRouter } from "next/router";

function Comment() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { postId, commentId } = router.query;

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const { setComments, addPost } = actions;
  const posts = useSelector((state) => state.home.posts);
  const post = posts.find((post) => post._id === postId);
  const comment = post?.comments?.find((comment) => comment._id === commentId);
  useEffect(() => {
    if (!router.isReady) return;
    const getPost = async () => {
      try {
        if (!post) {
          const { data } = await axios.get(`/post/${postId}`);

          if (data.status === "ok") {
            dispatch(addPost({ post: data.post }));
          } else {
            setFailedFetchPost(data.error);
          }
        } else if (!post.comments) {
          if (post.commentsCount === 0) {
            dispatch(setComments({ postId, comments: [] }));
          } else {
            const { data } = await axios.get(`/post/comments/${postId}`);
            if (data.status === "ok") {
              dispatch(setComments({ postId, comments: data.comments }));
            } else {
              setFailedFetchComments(data.error);
            }
          }
        }
      } catch (err) {
        setError("failed To fetch Post");
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [router.isReady]);
  if (loading) {
    return <JustLoading />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }
  return <Comments comment={comment} sliceName="home" postId={postId} />;
}
Comment.PageLayout = MainLayout;
export default Comment;
