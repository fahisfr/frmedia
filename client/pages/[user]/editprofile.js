import React, { useEffect, useRef, useState } from "react";
import { faker } from "@faker-js/faker";
import styles from "../../styles/editProfile.module.css";
import { MdAddAPhoto } from "react-icons/md";
import axios, { baseURL } from "../../axios";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../../features/user";
import ProfileLayout from "../../layouts/Profile";
import { useRouter } from "next/router";
import Link from "next/link";

function EditProfile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userName, bio, link, profilePic, coverPic } = useSelector(
    (state) => state.user.userInfo
  );

  const profileRef = useRef(null);
  const avatarRef = useRef(null);

  const [response, setResponse] = useState({ status: false, error: "" });

  const [newCoverPic, setNewCoverPic] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState(null);

  const [profilePreview, setProfilePreview] = useState(null);
  const [coverPicPreview, setCoverPicPreview] = useState(null);

  const [editedBio, setBio] = useState(null);
  const [editedLink, setLink] = useState(null);

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
    e.preventDefault();
    try {
      const formData = new FormData();
      console.log(newProfilePic);
      editedBio && formData.append("bio", editedBio);
      editedLink && formData.append("link", editedLink);
      newProfilePic && formData.append("profilePic", newProfilePic);
      newCoverPic && formData.append("coverPic", newCoverPic);

      console.log("api call ", formData);
      const { data } = await axios.post("/edit-profile", formData);

      if (data.status === "ok") {
        setResponse({ status: data.status, error: false });
        dispatch(updateUserInfo(data.updatedInfo));
        return;
      }
      setResponse({ status: data.status, error: data.error });
    } catch (error) {
      console.log(error);
    }
  };

  const closePage = (e) => {
    if (e.target === e.currentTarget) {
      router.push(`/${userName}`);
    }
  };

  return (
    <div className={styles.edit_profile} onClick={closePage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h3>EditProfile</h3>
          <Link href={`/${userName}`}>
            <div className={styles.close}></div>
          </Link>
        </header>

        <div className={styles.body}>
          <div className={styles.avatar}>
            <img
              className={styles.avatar_img}
              src={coverPicPreview ?? `${baseURL}/c/${coverPic}`}
              onClick={() => avatarRef.current.click()}
            />
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
              <img
                className={styles.profile_img}
                src={profilePreview ?? `${baseURL}/p/${profilePic}`}
                onClick={() => profileRef.current.click()}
              />
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
              <input
                className={styles.input}
                value={userName}
                type="text"
                disabled
              />

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

        <footer className={styles.footer}>
          <div className={styles.message}>
            {response.status === "ok" ? (
              <span className={styles.message_text}>Profile Updated</span>
            ) : response.status === "error" ? (
              <span style={{ color: "red" }} className={styles.message_text}>
                {response.error}
              </span>
            ) : (
              ""
            )}
          </div>
          <div>
            <button className={styles.btn} onClick={handleSubmit}>
              <span className={styles.btn_text}>Save</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

EditProfile.PageLayout = ProfileLayout;

export default EditProfile;
