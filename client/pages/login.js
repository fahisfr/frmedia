import styles from "../styles/ls.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "../axios";
import Image from "next/image";
import { signIn } from "next-auth/react";

function Login({}) {
  const router = useRouter();

  const [id, setId] = useState("fahis");
  const [password, setPassword] = useState("fahis");
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!id && !password) {
        return;
      }
      setLoading(true);
      const { data } = await axios.post("/login", { id, password });
      if (data.status === "ok") {
        localStorage.setItem("auth_token", data.token);
        router.push("/");
      } else {
        setLoginError(data.error);
      }
    } catch (error) {
      setLoading(false);
      setPopUpInfo({ trigger: true, error: true, message: error });
    }
  };

  return (
    <div className={styles.bg_img}>
      <div>
        <div className={styles.body}>
          <div className={styles.title}>
            <h1 className={styles.title_text}>Login</h1>

            {loginError && (
              <span className={styles.l_error_message}>{loginError}</span>
            )}
          </div>

          <form className={styles.form}>
            <div className={styles.group}>
              <input
                className={styles.input}
                type="text"
                placeholder=" "
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />

              <label className={styles.label}>Email address / User name</label>
            </div>

            <div className={styles.group}>
              <input
                className={styles.input}
                type="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className={styles.label}>Password</label>
            </div>

            <div
              className={`${styles.bottom} ${loading && styles.btn_loading}`}
            >
              <button
                className={styles.button}
                type="submit"
                onClick={onSubmit}
              >
                <span className={styles.button_text}>Login</span>
              </button>
            </div>
          </form>

          <div className={styles.au}>
            <div className={styles.au_bd}>
              <div className={styles.or_d}>
                <span className={styles.or_text}> or</span>
              </div>

              <div className={styles.au_group}>
                <button
                  className={styles.google_button}
                  onClick={async () => {
                    signIn("google");
                  }}
                >
                  <Image
                    src="/google_icon.svg"
                    width="30%"
                    height="80%"
                    alt=""
                  />
                  <span className={styles.google_button_text}>
                    Continue With Google
                  </span>
                </button>
                <div className={styles.body_bottom}>
                  <span>
                    Don't have an accound?
                    <Link href="/register"> Create One </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
