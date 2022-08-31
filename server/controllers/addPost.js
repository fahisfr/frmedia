const dbPost = require("../dbSchemas/post");
const dbUser = require("../dbSchemas/user");
const { getFileInfo } = require("../helper");

const addPost = async (req, res, next) => {
  try {
    const { text } = req.body;
    const { id } = req.user;

    const file = req.files?.file;

    const findHashTagesAndMentions = () => {
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

    console.log(findHashTagesAndMentions());

    const getPostInfo = () => {
      if (!file) {
        return {
          text,
          ...findHashTagesAndMentions(),
        };
      } else if (!text) {
        return {
          file: getFileInfo(file),
        };
      } else {
        return {
          text,
          file: getFileInfo(file),
          ...findHashTagesAndMentions(),
        };
      }
    };

    const postInfo = getPostInfo();

    const newPost = await dbPost.create({
      userId: id,
      ...postInfo,
    });

    if (newPost) {
      file && file.mv(`./public/${postInfo.file.type}/${postInfo.file.name}`);
      dbUser
        .updateOne({ _id: id }, { $push: { posts: newPost._id } })
        .then((res) => {});

      res.json({
        status: "ok",
        message: "Post Added Successfully",
        info: { ...newPost._doc, liked: false, likesCount: 0 },
      });
      return;
    }
    res.json({ status: "error", error: "can't add post" });
  } catch (err) {
    next(err);
  }
};

module.exports = addPost;
