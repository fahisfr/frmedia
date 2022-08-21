const getFileInfo = (file) => {
  const [type, extension] = file.mimetype.split("/");
  return {
    type,
    name: `${Math.random().toString(36).substr(2, 9)}.${extension}`,
  };
};

const getPostInfo = (file,content) => {
  if (!file) {
    return { content };
  } else if (!content) {
    return {
      file: getFileInfo(file),
    };
  } else {
    return {
      content,
      file: getFileInfo(file),
    };
  }
};


module.exports = {
  getFileInfo,
  getPostInfo,
}