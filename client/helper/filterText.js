import Link from "next/link";

const filterText = (text) => {
  return text.split(" ").map((word, index) => {
    if (word.startsWith("#")) {
      return (
        <Link href={`/hashtag/${word.slice(1)}`} key={index}>
          <a>{word} </a>
        </Link>
      );
    } else if (word.startsWith("@")) {
      return (
        <Link href={`/user/${word.slice(1)}`} key={index}>
          <a>{word} </a>
        </Link>
      );
    } else {
      return <span key={index}>{word} </span>;
    }
  });
};
export default filterText;
