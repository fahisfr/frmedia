import React from "react";
import MainLayout from "../../layouts/Main";
import styles from "../../styles/settings.module.css";
import Link from "next/link";
import useTheme from "../../hooks/useTheme";

function theme() {
  const [theme, setTheme] = useTheme();
  return (
    <div>
      <div className={styles.top}>
        <Link href="/settings">
          <div className={styles.back_icon}></div>
        </Link>
        <div>
          <h3 className={styles.title}>Select Theme</h3>
        </div>
      </div>
      <div className={styles.themes}>
        <div
          className={`${styles.theme} ${styles.light}`}
          onClick={() => setTheme()}
        >
          {theme == "light" && <div className={styles.selected}></div>}
        </div>
        <div
          className={`${styles.theme} ${styles.dark}`}
          onClick={() => setTheme()}
        >
          {theme == "dark" && <div className={styles.selected}></div>}
        </div>
      </div>
    </div>
  );
}
theme.PageLayout = MainLayout;
export default theme;
