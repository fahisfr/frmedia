const objectId = require("mongoose").Types.ObjectId;
const idIn = (id, array) => {
  if (id) {
    return {
      $in: [objectId(id), array],
    };
  }
  return false;
};

const DB_PROJECT_USERiNFO = {
  publicID: 1,
  userName: 1,
  profilePic: 1,
  coverPic: 1,
  verified: 1,
};



const getFileInfo = (file) => {
  const [type, extension] = file.mimetype.split("/");
  return {
    type,
    name: `${Math.random().toString(36).substr(2, 9)}.${extension}`,
  };
};
const findTagsAndMentions = (text) => {
  const mentions = [];
  const hashTags = [];
  text.split(" ").forEach((word) => {
    if (word.startsWith("#")) {
      hashTags.push(word.slice(1));
    } else if (word.startsWith("@")) {
      mentions.push(word.slice(1));
    }
  });

  return {
    mentions,
    hashTags,
  };
};

const getPcrInfo = (text, file) => {
  if (!file) {
    return {
      text,
      ...findTagsAndMentions(text),
    };
  } else if (!text) {
    return {
      file: getFileInfo(file),
    };
  } else {
    return {
      text,
      file: getFileInfo(file),
      ...findTagsAndMentions(text),
    };
  }
};

module.exports = {
  getPcrInfo,
  getFileInfo,
  idIn,
  findTagsAndMentions,
  DB_PROJECT_USERiNFO
};
