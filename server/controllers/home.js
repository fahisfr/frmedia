const dbUser = require("../dbSchemas/user");
const dbPost = require("../dbSchemas/post");
const objectId = require("mongoose").Types.ObjectId;

const home = async (req, res) => {
  try {
    const { id } = req.user;
    const getPosts = dbUser.aggregate([
      {
        $match: {
          _id: objectId(id),
        },
        
      },
    ]);

    return {
      status: "ok",
      posts: posts[0],
    };
  } catch (err) {
    return INSERR;
  }
};

module.exports = home;
