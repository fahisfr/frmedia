import styles from "../styles/options.module.css";
import getPostAcitons from "../features/actions/post";
import { useDispatch } from "react-redux";
import { BiHide, BiBlock } from "react-icons/bi";

function Options({ trigger, setTrigger, sliceName, id }) {
  const dispatch = useDispatch();
  const { hidePost } = getPostAcitons(sliceName);

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
          <span className={`${styles.option_name}`}>
            Report
          </span>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Options;
