const dbPost = require("../dbSchemas/post");
const dbUser = require("../dbSchemas/user");
const { getPcrInfo } = require("./helper");
const objectId = require("mongoose").Types.ObjectId;
const { uploadFile } = require("../config/awsS3");

const addPost = async (req, res, next) => {
  try {
    const {
      user: { publicID, id },
      body: { text },
    } = req;
    const file = req.file;

    const postInfo = getPcrInfo(text, file);
    const { mentions, file: fileInfo } = postInfo;

    if (file) {
      await uploadFile(file.buffer, fileInfo.name, fileInfo.type);
    }

    const newPost = await dbPost.create({
      userId: publicID,
      ...postInfo,
    });

    if (!newPost) return res.json({ status: "error", error: "can't add post" });

    if (mentions?.length > 0) {
      const dbBulk = await dbUser.collection.initializeUnorderedBulkOp();
      dbBulk.find({ _id: objectId(id) }).updateOne({ $push: { posts: newPost._id } });
      dbBulk.find({ userName: { $in: [...mentions] } }).updateOne({
        $push: {
          notifications: {
            type: "mention",
            userId: objectId(publicID),
            postId: newPost._id,
            pcr: "post",
            date: new Date(),
          },
        },
        $inc: {
          notifCount: 1,
        },
      });
      dbBulk.execute();
    } else {
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
  } catch (err) {
    next(err);
  }
};

module.exports = addPost;
