const dbUser = require("../dbSchemas/user");

const response = (available, message) => {
  return {
    status: "ok",
    available,
    message,
  };
};

const verifyUserName = async (req, res, next) => {
  try {
    const { userName } = req.params;
  

    const user = await dbUser.findOne({ userName });
  
    if (user) {
      console.log("yes")
      return res.json(response(false, " Username already registered "));
    }
    res.json(response(true, "User name is available"));
  } catch (error) {
    next();
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const {email} = req.params;
    const user = await dbUser.findOne({ email });
    if (user) {
      res.json(response(false, " Email already registered "));
      return;
    }
    res.json(response(true, "email is available"));
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = { verifyUserName, verifyEmail };
