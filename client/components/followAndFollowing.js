import React, { useEffect, useState } from "react";
import styles from "../styles/followersAndFollowing.module.css";
import { useSelector } from "react-redux";
import axios, { baseURL } from "../axios";
import { MdVerified } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";
import ErrorMessage from "../components/ErrorMessage";
import JustLoading from "../components/JustLoading";

function FollowAndFollowing() {
  const router = useRouter();
  const [result, setResult] = useState({ followers: [], following: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { asPath } = useRouter();
  const [_, user, pathName] = asPath.split("/");

  useEffect(() => {
    try {
      const getFF = async () => {
        const { data } = await axios.get(`/user/${user}/ff`);
        if (data.status === "ok") {
          setResult(data.result);
        }
      };

      getFF();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const getUsers = () => {
    if (pathName === "followers") {
      return result.followers;
    }
    return result.following;
  };
  let users = getUsers();
  const followHandler = async ({ publicID, isFollowing }) => {
    try {
      const updateFollowStatus = () => {
        for (user of users) {
          if (user.publicID === publicID) {
            user.isFollowing = !user.isFollowing;
            break;
          }
        }
        setResult({ ...result, [pathName]: users });
      };
      updateFollowStatus();
      const { data } = await axios.post(
        `/user/${isFollowing ? "unfollow" : "follow"}`,
        { id: publicID }
      );
      if (data.status === "error") {
        updateFollowStatus();
      }
    } catch (err) {
      alert(err);
    }
  };
  const closePage = (e) => {
    if (e.target === e.currentTarget) {
      router.push(`/${user}`);
    }
  };
  return (
    <div className={styles.con} onClick={closePage}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.hn}>
            <h3
              style={{ color: "var(--text-primary)" }}
              className={styles.Username}
            >
              @{user}
            </h3>
          </div>
          <div className={styles.cp}>
            <div className={styles.close} onClick={closePage}></div>
          </div>
        </div>
        <div className={styles.ff}>
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
                  console.log(user);
                  return (
                    <div className={styles.user} key={index}>
                      <div className={styles.profile}>
                        <img
                          className={styles.profile_img}
                          src={`${baseURL}/p/${user.profilePic}`}
                        />
                      </div>
                      <div className={styles.userInfo}>
                        <Link href={`/${user}`}>
                          <a>
                            <sapn className={styles.user_name}>
                              {user.userName}
                            </sapn>
                          </a>
                        </Link>

                        <MdVerified size={19} color="007aed" />
                      </div>
                      <div className={styles.f}>
                        {user.isFollowing ? (
                          <button
                            onClick={() => followHandler(user)}
                            className={`${styles.btn} ${styles.following}`}
                          >
                            Following
                          </button>
                        ) : (
                          <button
                            className={`${styles.btn} ${styles.follow}`}
                            onClick={() => followHandler(user)}
                          >
                            Follow
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <span></span>
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
