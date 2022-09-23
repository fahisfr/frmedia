import Link from "next/link";

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
      return <span key={index}>{word} </span>;
    }
  });
};
export default filterText;
