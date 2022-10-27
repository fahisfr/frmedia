import React, { useEffect, useState } from "react";
import styles from "../../styles/ls.module.css";
import axios from "../../axios";
import { useRouter } from "next/router";
import JustLoading from "../../components/JustLoading";
import SidePopUpMessage from "../../components/SidePopUpMessage";

function provider() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  const [btnLoading, setBtnLoading] = useState(false);
  const [inputFoucs, setInputFoucs] = useState(false);
  const [userNameStatus, setUserNameStatus] = useState({
    taken: false,
    available: false,
  });
  const [sidePopUpMess, setSidePopUpMess] = useState({
    trigger: false,
    error: false,
    message: "",
  });
  const triggerErrorMessage = (message = "oops something went wrong") => {
    setSidePopUpMess({ trigger: true, error: true, message });
  };
  const onChange = (e) => {
    setUserName(e.target.value.replace(/\s/g, ""));
    setUserNameStatus({ taken: false, available: false });
  };
  const googleAuth = async (e) => {
    try {
      setBtnLoading(true);
      const { provider, token } = router.query;
      const info = { provider, token };
      if (userName.length > 0) {
        info.userName = userName;
      }
      const { data } = await axios.post(`/nextauth`, info);
      switch (data.status) {
        case "ok":
          localStorage.setItem("auth_token", data.token);
          router.push("/");
          break;
        case "setUserName":
          setLoading(false);
          break;
        case "error":
          setLoading(false);
          triggerErrorMessage(data.error);
          break;
        default:
          setLoading(false);
          triggerErrorMessage();
      }
    } catch (error) {
      setLoading(false);
      triggerErrorMessage();
    } finally {
      setBtnLoading(false);
    }
  };
  useEffect(() => {
    if (!router.isReady) return;
    googleAuth();
  }, [router.isReady]);
  const verifyUserName = async () => {
    try {
      setBtnLoading(true);
      const { data } = await axios.get(`/verify/user-name/${userName}`);
      if (data.status === "error") {
        triggerErrorMessage(data.error);
        return;
      }
      if (data.available) {
        setUserNameStatus({ available: true, taken: false });
      } else {
        setUserNameStatus({ available: false, taken: true });
      }
    } catch (error) {
      triggerErrorMessage();
    } finally {
      setBtnLoading(false);
    }
  };
  const onBlur = () => {
    setInputFoucs(true);
    verifyUserName();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    googleAuth();
  };

  if (loading) {
    return <div></div>;
  }

  return (
    <div className={styles.bg_img}>
      <div className={styles.con}>
        <div className={styles.l_body} loading={loading.toString()}>
          {sidePopUpMess.trigger && (
            <SidePopUpMessage info={sidePopUpMess} setTrigger={setSidePopUpMess} />
          )}
          <div className={styles.title}>
            <span className={styles.title.text}>Set a username</span>
          </div>

          <form className={styles.from} onSubmit={onSubmit}>
            <div className={styles.group}>
              <input
                className={`${styles.input} ${
                  userNameStatus.available
                    ? styles.border_green
                    : userNameStatus.taken
                    ? styles.border_red
                    : ""
                }`}
                type="text"
                placeholder=""
                pattern="[a-zA-Z0-9]{4,20}"
                value={userName}
                onBlur={onBlur}
                focus={`${inputFoucs}`}
                onChange={onChange}
                required
              />
              <label className={styles.label}>UserName</label>

              {userNameStatus.available ? (
                <span className={styles.message}>{`"${userName}" UserName is availbel`}</span>
              ) : userNameStatus.taken ? (
                <span className={`${styles.message} ${styles.red}`}>
                  UserName alredy toekn
                </span>
              ) : (
                <small className={`${styles.invalid} ${styles.message} ${styles.red}`}>
                  Username should be 3-13 characters
                </small>
              )}
            </div>
            <div className={`${styles.bottom} ${btnLoading && styles.btn_loading}`}>
              <button className={styles.button} type="submit" disabled={btnLoading}>
                <span className={styles.button_text}>Submit</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default provider;
