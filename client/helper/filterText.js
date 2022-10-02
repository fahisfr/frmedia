import Link from "next/link";
import styles from "../styles/pcr.module.css";

const filterText = (text) => {
  return text.split(" ").map((word, index) => {
    if (word.startsWith("#")) {
      return (
        <Link href={`/hashtag/${word.slice(1)}`} key={index}>
          <span> {word} </span>
        </Link>
      );
    } else if (word.startsWith("@")) {
      return (
        <Link href={`/${word.slice(1)}`} key={index}>
          <span>{word} </span>
        </Link>
      );
    } else {
      return (
        <span  className={styles.text} key={index}>
          {word}
        </span>
      );
    }
  });
};
export default filterText;
