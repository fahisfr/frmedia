import React from "react";
import MainLayout from "../../layouts/Main";
import styles from "../../styles/settings.module.css";
import { IoColorPaletteSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
function index() {
  return (
    <>
      <div className={styles.top}>
        <Link href="/settings">
          <div className={styles.back_icon}></div>
        </Link>
        <div>
          <h3 className={styles.title}>Settings</h3>
        </div>
      </div>
      <div>
        <Link href="/fahis/editprofile">
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
      </div>
    </>
  );
}

index.PageLayout = MainLayout;
export default index;
