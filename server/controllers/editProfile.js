const dbUser = require("../dbSchemas/user");
const { getFileInfo } = require("../helper/getPcrInfo");

const editProfile = async (req, res, next) => {
  try {
    const coverPic = req.files?.coverPic;
    const profilePic = req.files?.profilePic;

    const {
      body: { bio, link },
      user: { id },
    } = req;

    const getUpdatedInfo = () => {
      const info = {};
      if (bio) {
        info.bio = bio;
      }
      if (link) {
        info.link = link;
      }
      if (coverPic) {
        info.coverPic = getFileInfo(coverPic).name;
      }
      if (profilePic) {
        info.profilePic = getFileInfo(profilePic).name;
      }
      return info;
    };

    const updatedInfo = getUpdatedInfo();

    const updated = await dbUser.updateOne(
      {
        _id: id,
      },
      {
        $set: { ...updatedInfo },
      }
    );
    if (updated.modifiedCount > 0) {
      coverPic && coverPic.mv(`./public/c/${updatedInfo.coverPic}`);
      profilePic && profilePic.mv(`./public/p/${updatedInfo.profilePic}`);
      res.json({ status: "ok", updatedInfo: updatedInfo });
      return;
    }

    res.json({ status: "error", error: "Profile not updated" });
  } catch (error) {
    next(error);
  }
};

module.exports = editProfile;
