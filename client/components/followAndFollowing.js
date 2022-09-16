import React, { useEffect, useState } from "react";
import styles from "../styles/followersAndFollowing.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios, { baseURL } from "../axios";
import { addFF } from "../features/user";
import { MdVerified } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";
import ErrorMessage from "../components/ErrorMessage";
import JustLoading from "../components/JustLoading";

function FollowAndFollowing() {
  const router = useRouter();
  const { userInfo, ffFetched } = useSelector((state) => state.user);
  const { followers, following } = userInfo;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userName } = userInfo;
  const { asPath } = useRouter();
  const [_, user, pathName] = asPath.split("/");

  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const getFF = async () => {
        const { data } = await axios.get(`/user/${user}/ff`);
        if (data.status === "ok") {
          dispatch(addFF(data.info));
        }
      };
      if (!ffFetched) {
        getFF();
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [user]);
  const closePage = (e) => {
    if (e.target === e.currentTarget) {
      router.push(`/${userName}`);
    }
  };
  const getUsers = () => {
    switch (pathName) {
      case "followers":
        return followers;
      case "following":
        return following;
      default:
        throw Error("pathName Error");
    }
  };
  const users = getUsers();
  
  return (
    <div className={styles.con} onClick={closePage}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.hn}>
            <h3 className={styles.Username}>@{userName}</h3>
          </div>
          <div className={styles.cp}>
            <div className={styles.close} onClick={closePage}></div>
          </div>
        </div>
        <div className={styles.ff}>
          <Link href={`/${user}/followers`}>
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
          </Link>
          <Link href={`/${user}/following`}>
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
          {error ? (
            <ErrorMessage error={error} />
          ) : loading ? (
            <JustLoading />
          ) : (
            <div className={styles.users}>
              {users.length > 0 ? (
                users.map((user, index) => {
                  console.log(user)
                  return (
                    <Link href={`/${user.userName}`}>
                      <div className={styles.user} key={index}>
                        <div className={styles.profile}>
                          <img
                            className={styles.profile_img}
                            src={`${baseURL}/p/${user.profilePic}`}
                          />
                        </div>
                        <div className={styles.userInfo}>
                          <sapn className={styles.user_name}>
                            {user.userName}
                          </sapn>
                          <MdVerified size={19} color="007aed" />
                        </div>
                        <div className={styles.f}>
                          <button className={styles.btn}>Follow</button>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div>
                  <span>Username not following no one</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FollowAndFollowing;
