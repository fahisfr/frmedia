import React, { useState } from "react";
import styles from "../../styles/ls.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "../../axios";
import Image from "next/image";
import SidePopUpMessage from "../../components/SidePopUpMessage";

function Index() {
  const inputsInitialState = {
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  };

  const statusInitialState = {
    taken: false,
    available: false,
  };
  const statusAavailable = {
    taken: false,
    available: true,
  };
  const statusTaken = {
    taken: true,
    available: false,
  };

  const router = useRouter();

  const [userNameStatus, setUserNameStatus] = useState(statusInitialState);
  const [emailStatus, setEmailStatus] = useState(statusInitialState);
  const [focus, setFocus] = useState(inputsInitialState);
  const [clicked, setClicked] = useState(inputsInitialState);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [sidePopUpMess, setSidePopUpMess] = useState({
    trigger: false,
    error: false,
    message: "",
  });
  const triggerErrorMessage = (message) => {
    setSidePopUpMess({ trigger: true, error: true, message });
  };
  const verifyEmailNow = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/verify/email/${email}`);
      const { status, available, error } = data;
      if (status == "error") {
        triggerErrorMessage(error);
      }
      if (available) {
        setEmailStatus(statusAavailable);
      } else {
        setEmailStatus(statusTaken);
      }
    } catch (error) {
      triggerErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const verifyUserNameNow = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/verify/user-name/${userName}`);
      if (data.status == "error") {
        triggerErrorMessage(data.error);
      }
      if (data.available) {
        setUserNameStatus(statusAavailable);
      } else {
        setUserNameStatus(statusTaken);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
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
    <div className={styles.bg_img}>
      {sidePopUpMess.trigger && (
        <SidePopUpMessage info={sidePopUpMess} setTrigger={setSidePopUpMess} />
      )}
      <div>
        <div className={styles.body}>
          <div className={styles.title}>
            <h1 className={styles.title_text}>Sign up</h1>
          </div>
          <form o className={styles.form}>
            <div className={styles.group}>
              <input
                className={`${styles.input} ${
                  userNameStatus.available
                    ? styles.border_green
                    : userNameStatus.taken
                    ? styles.border_red
                    : ""
                }`}
                name="name"
                type="text"
                placeholder=" "
                pattern="[a-zA-Z0-9]{3,13}"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  if (userNameStatus.available || userNameStatus.taken) {
                    setUserNameStatus(statusInitialState);
                  }
                }}
                onBlur={onBlur}
                focus={focus.name.toString()}
                required
              />
              <label
                name="name"
                clicked={clicked.name.toString()}
                onClick={() => setClicked({ ...clicked, name: true })}
                className={styles.label}
              >
                User Name
              </label>
              {userNameStatus.available ? (
                <span className={styles.message}>
                  {`"${userName}" UserName is availbel`}
                </span>
              ) : userNameStatus.taken ? (
                <span className={`${styles.message} ${styles.red}`}>
                  UserName alredy toekn
                </span>
              ) : (
                <sapn className={`${styles.invalid}`}>
                  Username should be 3-13 characters
                </sapn>
              )}
            </div>

            <div className={styles.group}>
              <input
                className={`${styles.input} ${
                  emailStatus.available
                    ? styles.border_green
                    : emailStatus.taken
                    ? styles.border_red
                    : ""
                }`}
                name="email"
                type="email"
                placeholder=" "
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailStatus.available || emailStatus.taken) {
                    setEmailStatus(statusInitialState);
                  }
                }}
                onBlur={onBlur}
                focus={focus.email.toString()}
                required
              />
              <label
                name="email"
                clicked={clicked.email.toString()}
                onClick={() => setClicked({ ...clicked, email: true })}
                className={styles.label}
              >
                Email
              </label>
              {emailStatus.available ? (
                <span className={styles.message}>Email is availbel</span>
              ) : emailStatus.taken ? (
                <span className={`${styles.message} ${styles.red}`}>
                  Email Already registered
                </span>
              ) : (
                <small className={`${styles.invalid}`}>
                  Please enter a valid email
                </small>
              )}
            </div>

            <div className={styles.group}>
              <input
                className={`${styles.input} ${styles.password}`}
                name="password"
                type="password"
                placeholder=" "
                pattern="[a-zA-Z0-9]{4,20}"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={onBlur}
                focus={focus.password.toString()}
                required
              />
              <label
                name="password"
                clicked={clicked.password.toString()}
                onClick={() => setClicked({ ...clicked, password: true })}
                className={styles.label}
              >
                Password
              </label>
              <span className={`${styles.invalid}`}>
                Password should be 4-20 characters
              </span>
            </div>

            <div className={styles.group}>
              <input
                className={`${styles.input} ${styles.password}`}
                name="confirmPassword"
                type="password"
                placeholder=" "
                pattern={password}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={onBlur}
                focus={focus.confirmPassword.toString()}
                required
              />
              <label
                name="confirmPassword"
                clicked={clicked.confirmPassword.toString()}
                onClick={() =>
                  setClicked({ ...clicked, confirmPassword: true })
                }
                className={styles.label}
              >
                Confirm Password
              </label>
              <span className={`${styles.invalid}`}>Password not match</span>
            </div>

            <div
              className={`${styles.bottom} ${
                loading ? styles.btn_loading : null
              }`}
            >
              <button className={styles.button} onClick={onSubmit}>
                <span className={styles.button_text}>Sign Up</span>
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
