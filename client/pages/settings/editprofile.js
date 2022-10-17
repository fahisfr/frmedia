import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/editProfile.module.css";
import { MdAddAPhoto } from "react-icons/md";
import axios, { baseURL } from "../../axios";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../../features/user";
import ProfileLayout from "../../layouts/Main";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import SidePopUpMessage from "../../components/SidePopUpMessage";

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
    e.preventDefault();
    try {
      const formData = new FormData();
      console.log(newProfilePic);
      editedBio && formData.append("bio", editedBio);
      editedLink && formData.append("link", editedLink);
      newProfilePic && formData.append("profilePic", newProfilePic);
      newCoverPic && formData.append("coverPic", newCoverPic);

      const { data } = await axios.post("/account/edit-profile", formData);

      if (data.status === "ok") {
        setResponse({ status: data.status, error: false });
        setPopUpInfo({
          trigger: true,
          error: false,
          message: "Profile updatedd",
        });
        dispatch(updateUserInfo(data.updatedInfo));
        return;
      }
      setPopUpInfo({ trigger: true, error: true, message: data.error });
      setResponse({ status: data.status, error: data.error });
    } catch (error) {
      setPopUpInfo({ trigger: true, error: true, message: error });
    }
  };

  return (
    <div className={styles.container}>
      {popUpInfo.trigger && (
        <SidePopUpMessage popUpInfo={popUpInfo} setTrigger={setPopUpInfo} />
      )}
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
          <Image
            src={coverPicPreview ?? `${baseURL}/c/${coverPic}`}
            layout="fill"
            objectFit="cover"
            alt=""
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
            <Image
              layout="fill"
              objectFit="cover"
              className="img_border_radius"
              alt=""
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

      <div className={styles.footer}>
        <div>
          <button className={styles.btn} onClick={handleSubmit}>
            <span className={styles.btn_text}>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}

EditProfile.PageLayout = ProfileLayout;

export default EditProfile;
