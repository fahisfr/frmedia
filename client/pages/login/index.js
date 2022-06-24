
import styles from "../../styles/ls.module.css";
import Link from "next/link";

function index() {
  
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        
        <div className={styles.title}>
          <h1 className={styles.title_text}>Login</h1>
        </div>

        <form o className={styles.form}>
          <div className={styles.form_group}>
            <input className={styles.form_input} type="email" placeholder="" />
            <label className={styles.form_label}>
              Email address / User name
            </label>
          </div>

          <div className={styles.form_group}>
            <input className={styles.form_input} type="password" placeholder=""/>
            <label className={styles.form_label}>Password</label>
          </div>

          <div className={styles.from_bottom}>
            <button className={styles.form_button} type="submit" onClick={() => setLoading(true)}>
              <span className={styles.form_button_text}>Login</span>
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
                <img src="/google_icon.svg" className={styles.google_button_icon}/>
                <span className={styles.google_button_text}>Continue With Google</span>
              </button>

              <div className={styles.body_bottom}>
                <span>
                  Don't have an accound? <Link href="/singup">Sing Up</Link>
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default index;
