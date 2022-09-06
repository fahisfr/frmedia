const getFileInfo = (file) => {
  const [type, extension] = file.mimetype.split("/");
  return {
    type,
    name: `${Math.random().toString(36).substr(2, 9)}.${extension}`,
  };
};

const pcrInfo = (text, file) => {
  if (!file) {
    return {
      text,
    };
  } else if (!text) {
    return {
      file: getFileInfo(file),
    };
  } else {
    return {
      text,
      file: getFileInfo(file),
    };
  }
};

module.exports = pcrInfo;
