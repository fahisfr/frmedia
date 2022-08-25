import React, { useEffect, useRef, useState } from "react";
import { faker } from "@faker-js/faker";
import styles from "../styles/editProfile.module.css";
import { MdAddAPhoto } from "react-icons/md";
import axios from "../axios";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../features/user";

function EditProfile({ trigger, setTrigger, info }) {
  const dispatch = useDispatch();
  const { userName, bio, link } = useSelector((state) => state.user.userInfo);

  const profileRef = useRef(null);
  const avatarRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [coverPic, setcoverPic] = useState(null);

  const [profilePreview, setProfilePreview] = useState(null);
  const [coverPicPreview, setCoverPicPreview] = useState(null);

  const [editedBio, setBio] = useState(null);
  const [editedLink, setLink] = useState(null);

  const fileInputOnChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      console.log(e.target.name);
      if (e.target.name === "profile") {
        setProfilePreview(reader.result);
        setProfile(file);
      } else if (e.target.name === "coverPic") {
        console.log("yes is cover pic");
        setCoverPicPreview(reader.result);
        setcoverPic(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      editedBio && formData.append("bio", editedBio);
      editedLink && formData.append("link", editedLink);
      profile && formData.append("profilePic", profile);
      coverPic && formData.append("coverPic", coverPic);

      const { data } = await axios.post("/edit-profile", formData);

      if (data.status === "ok") {
        dispatch(updateUserInfo(data.updatedInfo));
      }
    } catch (error) {}
  };

  const closePage = (e) => e.target === e.currentTarget && setTrigger(false);

  return trigger ? (
    <div className={styles.edit_profile} onClick={closePage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h3>EditProfile</h3>
          <div onClick={() => setTrigger(false)} className={styles.close}></div>
        </header>

        <div className={styles.body}>
          <div className={styles.avatar}>
            <img
              className={styles.avatar_img}
              src={coverPicPreview ?? faker.image.image()}
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
                src={profilePreview ?? faker.image.avatar()}
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
          <button className={styles.btn} onClick={handleSubmit}>
            Save
          </button>
        </footer>
      </div>
    </div>
  ) : null;
}

export default EditProfile;
