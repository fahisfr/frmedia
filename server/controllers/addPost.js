const dbPost = require("../dbSchemas/post");
const dbUser = require("../dbSchemas/user");
const { getPcrInfo, findTagsAndMentions } = require("./helper");
const objectId = require("mongoose").Types.ObjectId;

const addPost = async (req, res, next) => {
  try {
    const {
      user: { publicID, id },
      body: { text },
    } = req;
    const file = req.files?.file;

    const {mentions, ...postInfo } = await getPcrInfo(text, file);


    const newPost = await dbPost.create({
      userId: publicID,
      ...postInfo,
    });

    if (newPost) {
      file && file.mv(`./public/${postInfo.file.type}/${postInfo.file.name}`);
      if (mentions.length > 0) {
        const dbBulk = dbUser.collection.initializeUnorderedBulkOp();
        dbBulk
          .find({ _id: objectId(id) })
          .updateOne({ $push: { posts: newPost._id } });
        dbBulk.find({ userName: { $in: [...mentions] } }).updateOne({
          $push: {
            notifications: {
              type: "mention",
              userId: objectId(publicID),
              postId: newPost._id,
              pcr:"post",
              date: new Date(),
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
        ...postInfo,
        likesCount: 0,
        commentsCount: 0,
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
