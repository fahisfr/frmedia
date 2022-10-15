import React, { useState } from "react";
import styles from "../styles/ls.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "../axios";
import Image from "next/image"
function Index() {
  const router = useRouter();

  const [userName, setUserName] = useState("fahis");
  const [email, setEmail] = useState("fahis@gmail.com");
  const [password, setPassword] = useState("fahis");
  const [confirmPassword, setConfirmPassword] = useState("fahis");
  const [loading, setLoading] = useState(false);

  const [verifyEmailErr, setVerifyEmailErr] = useState(false);
  const [verifyUserNameErr, setVerifyUserNameErr] = useState(false);

  const [takenError, setTakenError] = useState({
    userName: false,
    email: false,
  });

  const verifyEmailNow = async () => {
    setLoading(true);
    const { data } = await axios.get(`/verify/email/${email}`);

    if (data.status === "error") {
      setVerifyEmailErr(true);
    } else {
      setLoading(false);
    }
  };

  const verifyUserNameNow = async () => {
    setLoading(true);
    const { data } = await axios.get(`/verify/user-name/${userName}`);
    if (data.approved === "error") {
      setVerifyUserNameErr(true);
    }
    setLoading(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/signup", {
        userName,
        email,
        password,
      });

      if (data.status === "ok") {
        localStorage.setItem("auth_token", data.token);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [focus, setFocus] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [clicked, setClicked] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const onBlur = (e) => {
    const { name } = e.target;
    setFocus({ ...focus, [name]: true });

    if (e.target.validity.valid) {
      if (name === "name") {
        verifyUserNameNow();
      } else if (name === "email") {
        verifyEmailNow();
      }
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.body}>
          <div className={styles.title}>
            <h1 className={styles.title_text}>Sign up</h1>
          </div>
          <form o className={styles.form}>
            <div className={styles.form_group}>
              <input
                className={styles.form_input}
                name="name"
                type="text"
                placeholder=" "
                pattern="[a-zA-Z0-9]{3,13}"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onBlur={onBlur}
                focus={`${focus.name}`}
                required
              />
              <label
                name="name"
                clicked={`${clicked.name}`}
                onClick={() => setClicked({ ...clicked, name: true })}
                className={styles.form_label}
              >
                User Name
              </label>
              <span className={styles.error_message}>
                {verifyUserNameErr
                  ? "Username is Already Taken"
                  : "Username should be 3-13 characters"}
              </span>
            </div>

            <div className={styles.form_group}>
              <input
                className={styles.form_input}
                name="email"
                type="email"
                placeholder=" "
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={onBlur}
                focus={`${focus.email}`}
                required
              />
              <label
                name="email"
                clicked={`${clicked.email}`}
                onClick={() => setClicked({ ...clicked, email: true })}
                className={styles.form_label}
              >
                Email
              </label>
              <span className={styles.error_message}>
                {verifyEmailErr
                  ? "Email Already registered"
                  : "Please enter a valid email"}
              </span>
            </div>

            <div className={styles.form_group}>
              <input
                className={styles.form_input}
                name="password"
                type="password"
                placeholder=" "
                pattern="[a-zA-Z0-9]{4,20}"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={onBlur}
                focus={`${focus.password}`}
                required
              />
              <label
                name="password"
                clicked={`${clicked.password}`}
                onClick={() => setClicked({ ...clicked, password: true })}
                className={styles.form_label}
              >
                Password
              </label>
              <span className={styles.error_message}>
                Password should be 4-20 characters
              </span>
            </div>

            <div className={styles.form_group}>
              <input
                className={styles.form_input}
                name="confirmPassword"
                type="password"
                placeholder=" "
                pattern="[a-zA-Z0-9]{4,20}"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={onBlur}
                focus={`${focus.confirmPassword}`}
                required
              />
              <label
                name="confirmPassword"
                clicked={`${clicked.confirmPassword}`}
                onClick={() =>
                  setClicked({ ...clicked, confirmPassword: true })
                }
                className={styles.form_label}
              >
                Confirm Password
              </label>
              <span className={styles.error_message}>Password not match</span>
            </div>

            <div
              className={`${styles.form_bottom} ${
                loading ? styles.btn_loading : null
              }`}
            >
              <button className={styles.form_button} onClick={onSubmit}>
                <span className={styles.form_button_text}>Sign Up</span>
              </button>
            </div>
          </form>

          <div className={styles.au}>
            <div className={styles.au_bd}>
              <div className={styles.or_d}>
                <span className={styles.or_text}> or</span>
              </div>

              <div className={styles.au_group}>
                <button className={styles.google_button}>
                  <Image
                    src="/google_icon.svg"
                    width="30%"
                    height="80%"
                    alt=""
                    className="img_border_radius"
                  />
                  <span className={styles.google_button_text}>
                    Continue With Google
                  </span>
                </button>

                <div className={styles.body_bottom}>
                  <span>
                    Already have an account? <Link href="/login">Login</Link>
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

export default Index;
