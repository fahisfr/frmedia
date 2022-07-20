import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import styles from "./EditProfile.module.css";
import { MdAddAPhoto } from "react-icons/md";

function EditProfile({trigger,setTrigger}) {

 
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const closePage = (e) => e.target === e.currentTarget && setTrigger(false); 

  return trigger ? (
    <div className={styles.edit_profile} onClick={closePage} >
      <div className={styles.container}>
        <div className={styles.avatar}>
          <img className={styles.avatar_img} src={faker.image.image()} />
          <MdAddAPhoto className={styles.md_add_icon} />
          
        </div>

        <div className={styles.pvi}>
          <div className={styles.profile}>
            <img className={styles.profile_img} src={faker.image.avatar()} />
            <MdAddAPhoto className={styles.md_add_icon} />
          </div>
        </div>

        <form className={styles.form}>
          <div className={styles.group}>
            <input className={styles.input} 
            value={faker.name.firstName()} 
            pattern="[a-zA-Z]{3,}"
            type="text"
            max={15}
            min={3}
            onChange={(e) => setName(e.target.value)}
            required
             />
            <label className={styles.label}>Name</label>
            <span className={styles.error_message}>asdf</span>
          </div>

          <div className={styles.group}>
            <textarea 
            className={styles.area_input}
            type="text"
            value={bio}
            max={770}
                          
              />
            <label className={styles.label}>bio</label>
            <span className={styles.error_message}>asdf</span>
            
          </div>
          <div className={styles.group}>
            <input 
             type="url" 
             className={styles.input}
             pattern="https://.*" 
             required
              />
            <label className={styles.label}>WebSite</label>
            <span className={styles.error_message}>asdf</span>
          </div>
          <div className={styles.bottom }>
            <button className={styles.btn}>Save </button>
          </div>
        </form>
      </div>
    </div>
  ):null;
}

export default EditProfile;
