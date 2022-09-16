const objectId = require("mongoose").Types.ObjectId;
const idIn = (id, array) => {
  if (id) {
    return {
      $in: [objectId(id), array],
    };
  }
  return false;
};

module.exports = { idIn };
