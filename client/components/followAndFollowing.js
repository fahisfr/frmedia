import React, { useEffect } from "react";
import styles from "../styles/followersAndFollowing.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { addFF } from "../features/user";
import { MdVerified } from "react-icons/md";
import { useRouter } from "next/router";
function FollowAndFollowing() {
  const { userInfo, ffFetched } = useSelector((state) => state.user);
  const { userName } = userInfo;
  const { asPath } = useRouter();

  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const getFF = async () => {
        const { data } = await axios.get("/user/ff");
        if (data.status === "ok") {
          dispatch(addFF(data.info));
        }
      };
      if (!ffFetched) {
        getFF();
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  const pathName = asPath.split("/")[2];
  const userName = asPath.split("/")[1];
  return (
    <div className={styles.con}>
      <div className={styles.content}>
        <div className={styles.top}>
          <span className={styles.Username}>{userName}</span>
        </div>
        <div className={styles.ff}>
          <div className={styles.group}>
            <span
              className={styles.ff_text}
              style={{
                color: pathName === "followers" ? "#007de8" : "",
              }}
            >
              Followers
            </span>
          </div>
          <Link herf={`${userInfo.userName}/followers`}>
            <div className={styles.group}>
              <span
                className={styles.ff_text}
                style={{
                  color: pathName === "following" ? "#007de8" : "",
                }}
              >
                Following
              </span>
            </div>
          </Link>
        </div>
        <div className={styles.body}>
          <div className={styles.users}>
            <div className={styles.user}>
              <div className={styles.profile}>
                <img
                  className={styles.profile_img}
                  src="http://localhost:4000/p/dmz6s0s4q.png"
                />
              </div>
              <div className={styles.userInfo}>
                <sapn className={styles.user_name}>Nick</sapn>
                <MdVerified size={19} color="007aed" />
              </div>
              <div className={styles.f}>
                <button className={styles.btn}>Follow</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowAndFollowing;
