import React, { useState, useEffect } from "react";
import styles from "../styles/profile.module.css";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import Post from "./Post";
import axios, { baseURL } from "../axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../features/profiles";
import Image from "next/image";
import JustLoading from "./JustLoading";
import ErrorMessage from "./ErrorMessage";

function Profile() {
  const {
    isReady,
    query: { user },
  } = useRouter();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userName } = useSelector((state) => state.user.userInfo);
  const { follow, addProfile } = actions;

  const profile = useSelector((state) => state.profiles.profiles).find(
    (profile) => profile.userName === user
  );

  useEffect(() => {
    if (!isReady) return;
    dispatch(actions.setUserName(user));
    const getProfile = async () => {
      try {
        if (profile) return;
        const { data } = await axios.get(`user/${user}`);
        if (data.status === "ok") {
          dispatch(addProfile(data.profile));
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getProfile();
  }, [isReady, user]);

  const followHandler = async () => {
    try {
      dispatch(follow());

      dispatch(actions.follow());
      const { data } = await axios.post(
        `/user/${profile.isFollowing ? "unfollow" : "follow"}`,
        {
          id: profile.publicID,
        }
      );
      if (data.status === "ok") {
        dispatch(follow());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isUserProfile = user === userName;

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!profile || loading) {
    return <JustLoading />;
  }

  const { profilePic } = profile;
  return (
    <div className={styles.container}>
      <div className={styles.cover_photo}>
        <Image src={profile.coverPic} layout="fill" objectFit="cover" alt="" />
      </div>

      <div className={styles.info}>
        <div>
          <div className={styles.info_left}>
            <div className={styles.profile}>
              <Image
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                alt=""
                src={profilePic}
              />
            </div>
          </div>
        </div>

        <div className={styles.info_right}>
          <div className={styles.info_nf}>
            <div className={styles.nf_l}>
              <h2 className={styles.name}>{profile.userName}</h2>
              {isUserProfile && (
                <Link href="/settings/editprofile">
                  <div className={styles.edit}>
                    <FiEdit className={styles.edit_icon} />
                    <div className={styles.edit_icon_m}>
                      <span>Edit&nbsp;Profile </span>
                    </div>
                  </div>
                </Link>
              )}
            </div>
            {!isUserProfile && (
              <div>
                {profile.isFollowing ? (
                  <button
                    className={`${styles.following} ${styles.btn}`}
                    onClick={followHandler}
                  >
                    Following
                  </button>
                ) : (
                  <button className={`${styles.btn} ${styles.follow}`} onClick={followHandler}>
                    Follow
                  </button>
                )}
              </div>
            )}
          </div>
          <div className={styles.fw_c}>
            <div>
              <Link href={`${profile.userName}/following`}>
                <div>
                  <span className={styles.fw_count}>{profile.followingCount}</span>
                  <span className={styles.fw}>Following</span>
                </div>
              </Link>
            </div>
            <div>
              <Link href={`${profile.userName}/followers`}>
                <div>
                  <span className={styles.fw_count}>{profile.followersCount}</span>
                  <span className={styles.fw}> Followers</span>
                </div>
              </Link>
            </div>
          </div>
          <div className={styles.bio}>
            <span className={styles.bio_text}>{profile.bio}</span>
            <div>
              <span className={styles.link}>
                <a target={"_blank"} rel="noreferrer" href={profile.link}>
                  {profile.link}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bv_group}>
          <sapn className={styles.bvn}>Posts</sapn>
        </div>
      </div>
      {profile.posts?.map((post, index) => {
        return <Post userInfo={profile} postInfo={post} key={index} sliceName="profile" />;
      })}
    </div>
  );
}

export default Profile;
