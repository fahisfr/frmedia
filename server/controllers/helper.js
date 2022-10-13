

const objectId = require("mongoose").Types.ObjectId;
const idIn = (id, array) => {
  if (id) {
    return {
      $in: [objectId(id), array],
    };
  }
  return false;
};

const DB_PROJECT_USERINFO = {
  publicID: 1,
  userName: 1,
  profilePic: 1,
  coverPic: 1,
  verified: 1,
};
const DB_PROJECT_POST = {
  _id: 1,
  text: 1,
  file: 1,
  postAt: 1,
  liked: 1,
  likesCount: 1,
  commentsCount: 1,
  userInfo: DB_PROJECT_USERINFO,
};

const DB_PROJECT_COMMENT = {
  _id: 1,
  text: 1,
  file: 1,
  postAt: 1,
  liked: 1,
  likesCount: 1,
  repliesCoutn: 1,
};
const DB_PROJECT_REPLY = {
  _id: 1,
  text: 1,
  file: 1,
  postAt: 1,
  liked: 1,
  likesCount: 1,
};

const DB_PROJECT_POST_LC = (id, likes = "$likes", comments = "$comments") => {
  const obj = {
    _id: 1,
    text: 1,
    file: 1,
    postAt: 1,
    likesCount: { $size: likes },
    commentsCount: { $size: comments },
    userInfo: DB_PROJECT_USERINFO,
  };
  if (id) {
    obj.liked = idIn(id, likes);
  }
  return obj;
};

const DB_PROJECT_COMMENT_LC = (id, likes = "$likes", replies = "$replies") => {
  const obj = {
    _id: 1,
    text: 1,
    file: 1,
    commentAt: 1,
    likesCount: { $size: likes },
    repliesCount: { $size: replies },
    userInfo: DB_PROJECT_USERINFO,
  };
  if (id) {
    obj.liked = idIn(id, likes);
  }
  return obj;
};

const DB_PROJECT_REPLY_LC = (id, likes = "$likes") => {
  const obj = {
    _id: 1,
    text: 1,
    file: 1,
    replyAt: 1,
    likesCount: { $size: likes },
    userInfo: DB_PROJECT_USERINFO,
  };
  if (id) {
    obj.liked = idIn(id, likes);
  }
  return obj;
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
  DB_PROJECT_USERINFO,
  DB_PROJECT_POST,
  DB_PROJECT_COMMENT,
  DB_PROJECT_REPLY,
  DB_PROJECT_POST_LC,
  DB_PROJECT_COMMENT_LC,
  DB_PROJECT_REPLY_LC,
};
