import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/editProfile.module.css";
import { MdAddAPhoto } from "react-icons/md";
import axios from "../../axios";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../../features/user";
import ProfileLayout from "../../layouts/Main";
import Link from "next/link";
import Image from "next/image";
import SidePopUpMessage from "../../components/SidePopUpMessage";
import { fetchUser } from "../../features/user";
import JustLoading from "../../components/JustLoading";

function EditProfile() {
  const dispatch = useDispatch();
  const { userInfo, fetched, loading } = useSelector((state) => state.user);
  useEffect(() => {
    if (!fetched) {
      dispatch(fetchUser);
    }
  });
  const { userName, bio, link, profilePic, coverPic } = userInfo;

  const profileRef = useRef(null);
  const avatarRef = useRef(null);

  const [btnLoading, setBtnLoading] = useState(false);

  const [newCoverPic, setNewCoverPic] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState(null);

  const [profilePreview, setProfilePreview] = useState(null);
  const [coverPicPreview, setCoverPicPreview] = useState(null);

  const [editedBio, setBio] = useState(null);
  const [editedLink, setLink] = useState(null);
  const [popUpInfo, setPopUpInfo] = useState({
    trigger: false,
    error: false,
    message: "",
  });

  const fileInputOnChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (e.target.name === "profile") {
        setProfilePreview(reader.result);
        setNewProfilePic(file);
      } else if (e.target.name === "coverPic") {
        setCoverPicPreview(reader.result);
        setNewCoverPic(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setBtnLoading(true);
      const formData = new FormData();
      editedBio && formData.append("bio", editedBio);
      editedLink && formData.append("link", editedLink);
      newProfilePic && formData.append("profilePic", newProfilePic);
      newCoverPic && formData.append("coverPic", newCoverPic);

      const { data } = await axios.post("/account/edit-profile", formData);
      if (data.status === "ok") {
        setPopUpInfo({
          trigger: true,
          error: false,
          message: "Profile updatedd",
        });
        dispatch(updateUserInfo(data.updatedInfo));
        return;
      }
      setPopUpInfo({ trigger: true, error: true, message: data.error });
    } catch (error) {
      console.log(error);
      setPopUpInfo({ trigger: true, error: true, message: error });
    } finally {
      setBtnLoading(false);
    }
  };

  if (loading) {
    return <JustLoading />;
  }

  return (
    <div className={styles.container}>
      {popUpInfo.trigger && <SidePopUpMessage info={popUpInfo} setTrigger={setPopUpInfo} />}
      <div className={styles.top}>
        <Link href="/settings">
          <div className={styles.back_icon}></div>
        </Link>
        <div>
          <span className={styles.title}>Edit Profile</span>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.coverPic}>
          {coverPic ? (
            <Image
              src={coverPicPreview ?? coverPic}
              layout="fill"
              objectFit="cover"
              alt=""
              onClick={() => avatarRef.current.click()}
            />
          ) : (
            <div className={`${styles.coverPic} skeleton`}></div>
          )}

          <MdAddAPhoto className={styles.md_add_icon} />

          <input
            className={styles.ref_input}
            type="file"
            accept="image/*"
            name="coverPic"
            ref={avatarRef}
            onChange={fileInputOnChange}
          />
        </div>
        <div className={styles.pvi}>
          <div className={styles.profile}>
            {profilePic ? (
              <Image
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                alt=""
                src={profilePreview ?? profilePic}
                onClick={() => profileRef.current.click()}
              />
            ) : (
              <div className={`${styles.profile} skeleton rounded-full`}></div>
            )}

            <MdAddAPhoto className={styles.md_add_icon} />

            <input
              className={styles.ref_input}
              type="file"
              accept="image/*"
              name="profile"
              ref={profileRef}
              onChange={fileInputOnChange}
            />
          </div>
        </div>
        <form className={styles.form}>
          <div className={styles.group}>
            <input className={styles.input} value={userName} type="text" disabled />

            <label className={styles.label}>User Name</label>
          </div>
          <div className={styles.group}>
            <textarea
              className={styles.area_input}
              type="text"
              value={editedBio ?? bio}
              onChange={(e) => setBio(e.target.value)}
              max={770}
            />

            <label className={styles.label}>bio</label>
          </div>
          <div className={styles.group}>
            <input
              type="url"
              className={styles.input}
              value={editedLink ?? link}
              placeholder="https://example.com"
              onChange={(e) => setLink(e.target.value)}
            />
            <label className={styles.label}>Link</label>
          </div>
        </form>
      </div>

      <div className={`${styles.footer} ${btnLoading && styles.btn_loading}`}>
        <button className={`${styles.btn} `} onClick={handleSubmit} disabled={btnLoading}>
          <span className={styles.btn_text}>Save</span>
        </button>
      </div>
    </div>
  );
}

EditProfile.PageLayout = ProfileLayout;

export default EditProfile;
