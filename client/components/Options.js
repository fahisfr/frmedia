import styles from "../styles/options.module.css";
import getPostAcitons from "../features/actions/post";
import { useDispatch, useSelector } from "react-redux";
import { BiHide, BiBlock } from "react-icons/bi";
import axios from "../axios";
import Confirmation from "./Confirmation";
import { useState } from "react";

function Options({ trigger, setTrigger, sliceName, id, userId }) {
  const dispatch = useDispatch();
  const { hidePost } = getPostAcitons(sliceName);
  const publicID = useSelector((state) => state.user?.userInfo?.publicID);
  const [deleteConfiTrigger, setDeleteConfiTrigger] = useState(false);

  const deletePost = async () => {
    try {
      const { data } = await axios.post("delete-post", { postId: id, userId });
      if (data.status == "ok") {
        setTrigger(false);
        dispatch(hidePost({ id }));
      }
    } catch (err) {}
  };

  return trigger ? (
    <>
      <Confirmation
        trigger={deleteConfiTrigger}
        setTrigger={setDeleteConfiTrigger}
        message="are you sure you want to delete"
        btnColorRed={true}
        btnText="Delete"
        confirmed={deletePost}
      />
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
          {publicID == userId && (
            <div
              className={styles.option}
              style={{ color: "red" }}
              onClick={() => setDeleteConfiTrigger(true)}
            >
              <BiBlock className={styles.icon} />
              <span className={`${styles.option_name}`}>Delete</span>
            </div>
          )}
        </div>
      </div>
    </>
  ) : null;
}

export default Options;
