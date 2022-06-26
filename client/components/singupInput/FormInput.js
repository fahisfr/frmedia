import React, { useState } from "react";
import styles from "../../styles/ls.module.css";

function FromInputs(props) {
  
  const [focus, setFocus] = useState(false);
  const { label, errorMessage, onChange, ...inputProps } = props;

  return (
    <div className={styles.form_group}>
      <input

        className={styles.form_input}
        {...inputProps}
        onChange={onChange}
        onBlur={(e) => setFocus(true)}
        focus={focus.toString()}
        required

      />
      <label className={styles.form_label}>{label}</label>
      <span className={styles.error_message}>{errorMessage}</span>
    </div>
  );
}

export default FromInputs;
