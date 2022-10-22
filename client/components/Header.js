import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/header.module.css";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import axios, { baseURL } from "../axios";
import JustLoading from "../components/JustLoading";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Image from "next/image";
import { BsSunFill } from "react-icons/bs";

function Header({ theme, setTheme }) {
  const router = useRouter();
  const { profilePic, userName } = useSelector((state) => state.user.userInfo);

  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);

  const [focusedIndex, setFocusedIndex] = useState(0);
  const resultContainer = useRef(null);
  const searchHandler = async (e) => {
    try {
      const value = e.target.value;
      setSearchText(value);
      if (value.length > 0) {
        setLoading(true);
        const { data } = await axios.get(`/search/${value}`);
        if (data.status === "ok") {
          setResults(data.result);
        }
        setLoading(false);
      }
    } catch (error) {}
  };
  const handleKeyDown = (e) => {
    const { key } = e;

    if (key === "ArrowDown") {
      setFocusedIndex((focusedIndex + 1) % results.length);
    }
    if (key === "ArrowUp") {
      setFocusedIndex((focusedIndex + results.length - 1) % results.length);
    }

    if (key === "Escape") {
      setShowResults(false);
    }
    if (key === "Enter") {
      e.preventDefault();
      setShowResults(false);
      setSearchText("");
      router.push(`/${results[focusedIndex].userName}`);
    }
  };
  const handleSelection = (index) => {
    const selectedItem = results[index];
    selectedItem && router.push(`/${selectedItem.userName}`);
    setSearchText("");
  };
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <div className={styles.lt}>
          <div className={styles.logo}>
            <Image src="/frlogo.png" layout="fill" alt="" className={styles.logo_img} />
          </div>
          <span className={styles.title}>Midea</span>
        </div>

        <div className={styles.search} tabIndex={1} onKeyDown={handleKeyDown}>
          <div className={styles.search_input}>
            <input
              className={styles.input}
              type="text"
              value={searchText}
              onChange={searchHandler}
              onFocus={() => setShowResults(true)}
              onBlur={() => setShowResults(false)}
              placeholder="Search for user or tags.."
            />
            <div className={styles.search_icon}>
              {loading ? <JustLoading /> : <div className={styles.icon}></div>}
            </div>
            {showResults && (
              <div className={styles.result}>
                {results.map((item, index) => {
                  return (
                    <div
                      key={index}
                      ref={index === focusedIndex ? resultContainer : null}
                      onMouseDown={() => handleSelection(index)}
                      className={`${styles.result_item} ${
                        index === focusedIndex && styles.item_focuse
                      }`}
                    >
                      <div className={styles.result_item_right}>
                        <div className={styles.img}>
                          <Image
                            alt=""
                            src={`${item.profilePic}`}
                            className="img_border_radius "
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      </div>
                      <div className={styles.result_item_left}>
                        <span className={styles.text}>{item.userName}</span>
                        {item.verified && <MdVerified className={styles.verified_icon} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className={styles.n_p}>
          <div className={styles.theme_btn}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={theme == "dark"}
              onChange={() => setTheme}
            />
            <label className={styles.label} onClick={setTheme}>
              <div className={styles.icon_moon}></div>
              <BsSunFill className={styles.icon_sun} />
              <div className={styles.ball}></div>
            </label>
          </div>
          <Link href={`/${userName}`}>
            <a>
              <div className={styles.profile}>
                <Image
                  src={profilePic}
                  layout="fill"
                  objectFit="cover"
                  className="img_border_radius"
                  alt=""
                />
              </div>
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
