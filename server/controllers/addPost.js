const dbPost = require("../dbSchemas/post");
const dbUser = require("../dbSchemas/user");
const getPcrInfo = require("../helper/getPcrInfo");

const addPost = async (req, res, next) => {
  try {
    const { text } = req.body;
    const { id } = req.user;
    const file = req.files?.file;

    const getTagsAndMentions = (text) => {
      const mentions = [];
      const hashTags = [];
      console.log(text, "a");
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

    const postInfo = getPcrInfo(text, file);

    const newPost = await dbPost.create({
      userId: id,
      ...postInfo,
      hashTags: getTagsAndMentions(text).hashTags,
    });

    if (newPost) {
      file && file.mv(`./public/${postInfo.file.type}/${postInfo.file.name}`);
      dbUser
        .updateOne({ _id: id }, { $push: { posts: newPost._id } })
        .then((res) => {});
      const postInfo = newPost._doc;
      console.log(postInfo);
      res.json({
        status: "ok",
        message: "Post Added Successfully",
        info: { info: postInfo, liked: false },
      });
      return;
    }
    res.json({ status: "error", error: "can't add post" });
  } catch (err) {
    next(err);
  }
};

module.exports = addPost;
