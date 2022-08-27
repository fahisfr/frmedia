const dbPost = require("../dbSchemas/post");
const dbUser = require("../dbSchemas/user");
const { getFileInfo } = require("../helper");

const addPost = async (req, res) => {
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

    console.log(newPost);

    if (newPost) {
      file && file.mv(`./public/${postInfo.file.type}/${postInfo.file.name}`);
      dbUser
        .updateOne({ _id: id }, { $push: { posts: newPost._id } })
        .then((res) => {
          console.log(res);
        });
      res.json({ message: "Post added successfully" });
    } else {
      res.json({ success: false, message: "can't add post" });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "oops something went wrong" });
  }
};

module.exports = addPost;
