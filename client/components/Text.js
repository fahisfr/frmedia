import Link from "next/link";

function Text({ text }) {
  return text.split(" ").map((word) => {
    if (word.startsWith("#")) {
      return (
        <Link href={`/hashtag/${word.slice(1)}`}>
          <p>{word} </p>
        </Link>
      );
    } else if (word.startsWith("@")) {
      return (
        <Link href={`/user/${word.slice(1)}`}>
          <p>{word} </p>
        </Link>
      );
    } else {
      return <span>{word} </span>;
    }
  });
}

export default Text;
