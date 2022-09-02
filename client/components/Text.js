import Link from "next/link";


function Text({ text }) {
  return text.split(" ").map((word,index) => {
    if (word.startsWith("#")) {
      return (
        <Link href={`/hashtag/${word.slice(1)}`} key={index}>
          <a>
            <sapn>{word} </sapn>
          </a>
        </Link>
      );
    } else if (word.startsWith("@")) {
      return (
        <Link href={`/${word.slice(1)}`}key={index}>
          <a>
            <sapn>{word} </sapn>
          </a>
        </Link>
      );
    } else {
      return <span key={index}>{word} </span>;
    }
  });
}

export default Text;
