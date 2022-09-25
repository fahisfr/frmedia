const dbPost = require("../dbSchemas/post");
const dbUser = require("../dbSchemas/user");
const { getPcrInfo } = require("../helper/getPcrInfo");
const objectId = require("mongoose").Types.ObjectId;

const addPost = async (req, res, next) => {
  try {
    const {
      user: { publicID, id },
      body: { text },
    } = req;
    const file = req.files?.file;

    const getTagsAndMentions = (text) => {
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

    const postInfo = await getPcrInfo(text, file);
    const { hashTags, mentions } = getTagsAndMentions(text);

    const newPost = await dbPost.create({
      userId: publicID,
      ...postInfo,
      hashTags,
    });

    if (newPost) {
      file && file.mv(`./public/${postInfo.file.type}/${postInfo.file.name}`);
      if (mentions.length > 0) {
        const dbBulk = dbUser.collection.initializeUnorderedBulkOp();
        dbBulk
          .find({ _id: objectId(id) })
          .updateOne({ $push: { posts: newPost._id } });
        dbBulk.find({ userName: { $in: [...mentions] } }).update({
          $push: {
            notifications: {
              type: "mention",
              userId: objectId(publicID),
              postId: newPost._id,
            },
          },
          $inc: {
            notifCount: 1,
          },
        });
        dbBulk.execute();
      }

      if (mentions.length === 0) {
        await dbUser.updateOne({ _id: id }, { $push: { posts: newPost._id } });
      }

      const info = {
        _id: newPost._id,
        userId: publicID,
        text: newPost.text,
        flie: newPost.file,
        postAt: newPost.postAt,
        likesCount: 0,
        CommentCount: 0,
      };
      res.json({ status: "ok", message: "Post Added Successfully", info });
      return;
    }
    res.json({ status: "error", error: "can't add post" });
  } catch (err) {
    next(err);
  }
};

module.exports = addPost;
