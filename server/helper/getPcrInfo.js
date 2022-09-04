const getFileInfo = (file) => {
  const [type, extension] = file.mimetype.split("/");
  return {
    type,
    name: `${Math.random().toString(36).substr(2, 9)}.${extension}`,
  };
};

const getTagsAndMentions = (text) => {
  const mentions = [];
  const hashTags = [];
  console.log(text, "a");
  text.split(" ").forEach((word) => {
    if (word.startsWith("#")) {
      hashTags.push({ name: word.slice(1), count: 1 });
    } else if (word.startsWith("@")) {
      mentions.push(word.slice(1));
    }
  });

  console.log(hashTags);
  return {
    mentions,
    hashTags,
  };
};

const pcrInfo = (text, file) => {

  if (!file) {
    console.log("not file ")
    const { hashTags, mentions } = getTagsAndMentions(text);
    return {
      text,
      hashTags,
      mentions,
    };
  } else if (!text ) {

    return {
      file: getFileInfo(file),
    };
  } else {
    const { hashTags, mentions } = getTagsAndMentions(text);
    
    return {
      text,
      file: getFileInfo(file),
      mentions,
      hashTags,
    };
  }
};

module.exports = pcrInfo;
