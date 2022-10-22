const dbUser = require("../dbSchemas/user");
const { getFileInfo } = require("./helper");
const { uploadFile } = require("../config/awsS3");

const editProfile = async (req, res, next) => {
  try {
    const coverPic = req.files?.coverPic;
    const profilePic = req.files?.profilePic;

    const { id } = req.user;

    const updatedInfo = { ...req.body };
    if (profilePic) {
      const { name } = getFileInfo(profilePic[0]);
      (updatedInfo.profilePic = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_BUCKET_REGION}.amazonaws.com/profiles/${name}`),
        await uploadFile(profilePic[0].buffer, name, "profiles");
    }
    if (coverPic) {
      const { name } = getFileInfo(coverPic[0]);
      (updatedInfo.coverPic = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_BUCKET_REGION}.amazonaws.com/coverPics/${name}`),
        await uploadFile(coverPic[0].buffer, name, "coverPics");
    }

    const updated = await dbUser.updateOne(
      { _id: id }, 
      { $set: updatedInfo });

    if (updated.modifiedCount > 0) {
      return res.json({ status: "ok", updatedInfo: updatedInfo });
    }
    res.json({ status: "error", error: "Profile not updated" });
  } catch (error) {
    next(error);
  }
};

module.exports = editProfile;
