const dbUser = require("../dbSchemas/user");
const { getFileInfo } = require("../helper");

const editProfile = async (req, res) => {
  try {
    const coverPic = req.files?.coverPic;
    const profilePic = req.files?.profilePic;
    const {
      body: { bio, link },
      user: { id },
    } = req;
 
    const getUpdatedInfo = () => {
      const info = {
        bio,
      };
      if (coverPic) {
        info.coverPic = getFileInfo(coverPic).name;
      }
      if (profilePic) {
        info.profilePic = getFileInfo(profilePic).name;
      }
      return info;
    };

    const info = getUpdatedInfo();

    const update = await dbUser.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          ...info,
        },
      }
    );

    if (update.modifiedCount > 0) {
      coverPic && coverPic.mv(`./public/c/${info.coverPic}`);
      profilePic && profilePic.mv(`./public/p/${info.profilePic}`);
      res.json({ success: true, message: "Profile updated successfully" });
      return;
    }

    res.json({ success: false, message: "Profile not updated" });
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "oops something went wrong:(" });
  }
};

module.exports = editProfile;
