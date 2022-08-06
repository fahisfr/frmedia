const dbUser = require("../dbSchemas/user");
const {dbPost} = require("../dbSchemas/post");

const home = async (_,) => {
  try {

    const userInfo = await dbUser.findById("62ead02431f8c32a78c6a91a");
    const posts = await dbPost.find({}).populate("userInfo");

    return { userInfo, posts };
  } catch (err) {
    console.log(err);
  }
};

module.exports = home;
