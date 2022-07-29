import React, { useState } from "react";
import styles from "../styles/ls.module.css";
import Link from "next/link";
import { singUpRequest } from "../graphql/mutation";
import { verifyEmailQuery, verifyUserNamesQuery } from "../graphql/qurey";
import { gql, useLazyQuery } from "@apollo/client";



function index() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [
    verifyEmailNow,
    {
      data: verifyEmailData,
      error: verifyEmailError,
      loading: verifyEmailLoading,
    },
  ] = useLazyQuery(verifyEmailQuery);

  const [
    verifyUserNameNow,
    {
      data: verfiyNameData,
      error: verifyNameError,
      loading: verifyNameLoading,
    },
  ] = useLazyQuery(verifyUserNamesQuery);

  const [loginNow, { data, error, loading }] = singUpRequest(
    name,
    email,
    password
  );

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
    console.log(e.target.validity.valid);
    if (name === "name" || ("email" && e.target.validity.valid)) {
      
      if (name === "name") {
        verifyUserNameNow({ variables: { userName: e.target.value } });

      } else if (name === "email") {
        verifyEmailNow({ variables: { email: e.target.value } });
        
      }
    }
  };
  const onFocus = (e) => {
    const { name } = e.target;
  };

  const labelOnClick = (e) => {
    setClicked({ ...clicked, [e.target.name]: true });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    loginNow();
  };
 
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.body}>
          <div className={styles.title}>
            <h1 className={styles.title_text}>Sing up</h1>
          </div>
          <form o className={styles.form}>
            <div className={styles.form_group}>
              <input
                className={styles.form_input}
                name="name"
                type="text"
                placeholder=" "
                pattern="[a-zA-Z0-9]{3,13}"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={onBlur}
                focus={`${focus.name}`}
                required
              />
              <label
                name="name"
                clicked={clicked}
                onClick={labelOnClick}
                className={styles.form_label}
              >
                User Name
              </label>
              <span className={styles.error_message}>
                {verifyNameError
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
                className={styles.form_label}
                onClick={labelOnClick}
              >
                Email
              </label>
              <span className={styles.error_message}>
                {verifyEmailData
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
                className={styles.form_label}
                onClick={labelOnClick}
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
                className={styles.form_label}
                onClick={labelOnClick}
              >
                Confirm Password
              </label>
              <span className={styles.error_message}>Password not match</span>
            </div>

            <div className={styles.form_bottom}>
              <button className={styles.form_button} onClick={onSubmit}>
                <span className={styles.form_button_text}>Sing Up</span>
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
                  <img
                    src="/google_icon.svg"
                    className={styles.google_button_icon}
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

export default index;