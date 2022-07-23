import React, { useRef, useState } from "react";
import { faker } from "@faker-js/faker";
import styles from "./EditProfile.module.css";
import { MdAddAPhoto } from "react-icons/md";

function EditProfile({ trigger, setTrigger }) {
  const profileRef = useRef(null);
  const avatarRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const [profilePreview, setProfilePreview] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [link, setLink] = useState("");

  const inputOnChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      console.log(e.target.name);
      if (e.target.name === "profile") {
        setProfilePreview(reader.result);
        setProfile(file);
      } else {
        setAvatarPreview(reader.result);
        setAvatar(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("link", link);
    formData.append("profile", profile);
    formData.append("avatar", avatar);
  };

  const closePage = (e) => e.target === e.currentTarget && setTrigger(false);

  return trigger ? (
    <div className={styles.edit_profile} onClick={closePage}>
      <div className={styles.container}>
        <div className={styles.avatar}>
          <img
            className={styles.avatar_img}
            src={avatarPreview ?? faker.image.image()}
            onClick={() => avatarRef.current.click()}
          />
          <MdAddAPhoto className={styles.md_add_icon} />

          <input
            className={styles.ref_input}
            type="file"
            accept="image/*"
            name="avatar"
            ref={avatarRef}
            onChange={inputOnChange}
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
              onChange={inputOnChange}
            />
          </div>
        </div>
        <form className={styles.form}>
          <div className={styles.group}>
            <input
              className={styles.input}
              value={name}
              pattern="[a-zA-Z]{3,}"
              type="text"
              max={15}
              min={3}
              onChange={(e) => setName(e.target.value)}
            />

            <label className={styles.label}>Name</label>
            <span className={styles.error_message}>asdf</span>
          </div>
          <div className={styles.group}>
            <textarea
              className={styles.area_input}
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              max={770}
            />

            <label className={styles.label}>bio</label>
            <span className={styles.error_message}>asdf</span>
          </div>
          <div className={styles.group}>
            <input
              type="url"
              className={styles.input}
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />

            <label className={styles.label}>WebSite</label>
            <span className={styles.error_message}>asdf</span>
          </div>
          <div className={styles.bottom}>
            <button className={styles.btn} onClick={handleSubmit}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

export default EditProfile;
