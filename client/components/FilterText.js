import React from "react";
import styles from "../styles/pcr.module.css";
import Link from "next/link";

function FilterText({ text }) {
  const words = text.split(" ");
  return (
    <div className={styles.message}>
      {words.map((word, index) => {
        if (word.startsWith("#")) {
          return (
            <Link href={`/hashtage/${word.slice(1)}`} key={index}>
              <span style={{ color: "var(--default-blue)" }}> {word} </span>
            </Link>
          );
        } else if (word.startsWith("@")) {
          return (
            <Link href={`/${word.slice(1)}`} key={index}>
              <span style={{ color: "var(--default-blue)" }}>{word}</span>
            </Link>
          );
        } else {
          return (
            <span className={styles.text} key={index}>
              {` ${word} `}
            </span>
          );
        }
      })}
    </div>
  );
}

export default FilterText;
