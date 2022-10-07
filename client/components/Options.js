import styles from "../styles/options.module.css";
import getPostAcitons from "../features/actions/post";
import { useDispatch } from "react-redux";
import { BiHide, BiBlock } from "react-icons/bi";
import axios from "../axios";

function Options({ trigger, setTrigger, sliceName, id, userId }) {
  const dispatch = useDispatch();
  const { hidePost } = getPostAcitons(sliceName);

  const deletePost = async () => {
    try {
      const { data } = await axios.post("delete-post", { postId: id, userId });
      if (data.status == "ok") {
        dispatch(hidePost({ id }));
        return;
      }
      alert("failed to delete post ");
    } catch (err) {
      alert(err);
    }
  };

  return trigger ? (
    <div className={styles.con}>
      <div className={styles.body}>
        <div
          className={styles.option}
          onClick={() => {
            setTrigger(false);
            dispatch(hidePost({ id }));
          }}
        >
          <BiHide className={styles.icon} />
          <span className={styles.option_name}>Hide this post</span>
        </div>
        <div className={styles.option}>
          <BiBlock className={styles.icon} />
          <span className={`${styles.option_name}`}>Report</span>
        </div>
      </div>
      <div className={styles.option} onClick={deletePost}>
        <BiBlock className={styles.icon} />
        <span className={`${styles.option_name}`}>Delete</span>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Options;
