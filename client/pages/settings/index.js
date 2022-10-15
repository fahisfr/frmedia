import React, { useState } from "react";
import MainLayout from "../../layouts/Main";
import styles from "../../styles/settings.module.css";
import { IoColorPaletteSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import Link from "next/link";
import axios from "../../axios";
import { useRouter } from "next/router";
import SidePopMessage from "../../components/SidePopUpMessage";

function Index() {
  const router = useRouter();
  const [popUpInfo, setPopUpInfo] = useState({
    trigger: false,
    error: false,
    message: "",
  });

  const logoutNow = async () => {
    try {
      const { data } = await axios.delete("/account/logout");
      if (data.status == "ok") {
        localStorage.removeItem("auth_token");
        router.push("/login");
      } else {
        setPopUpInfo({ trigger: true, error: true, message: data.error });
      }
    } catch (error) {
      setPopUpInfo({
        trigger: true,
        error: true,
        message: "oops somthing went wronge",
      });
    }
  };
  return (
    <div>
      {popUpInfo.trigger && (
        <SidePopMessage popUpInfo={popUpInfo} setTrigger={setPopUpInfo} />
      )}

      <div className={styles.top}>
        <Link href="/settings">
          <div className={styles.back_icon}></div>
        </Link>
        <div>
          <h3 className={styles.title}>Settings</h3>
        </div>
      </div>
      <div>
        <Link href="/settings/editprofile">
          <a>
            <div className={styles.group}>
              <CgProfile className={styles.icon} />
              <span className={styles.text}>Edit Profile</span>
            </div>
          </a>
        </Link>
        <Link href="settings/theme">
          <a>
            <div className={styles.group}>
              <IoColorPaletteSharp className={styles.icon} />
              <sapn className={styles.text}>Change Theme</sapn>
            </div>
          </a>
        </Link>
        <div className={styles.group} onClick={logoutNow}>
          <TbLogout className={styles.icon_logout} />
          <span className={styles.logout_text}> Logout</span>
        </div>
      </div>
    </div>
  );
}

Index.PageLayout = MainLayout;
export default Index;
