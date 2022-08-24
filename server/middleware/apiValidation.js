const joi = require("joi");

const signup = joi.object().keys({
  userName: joi.string().alphanum().min(3).max(30).required(),
  email: joi.string().email().required(),
});

const login = joi.object().keys({
  id: joi.string().required(),
  password: joi.string().required(),
});



const getSchema = (api) => {
  console.log(api, "asfd");
  switch (api) {
    case "signup":
      return signup;
    case "login":
      return login;
    default:
      return null;
  }
};

const validate = (api) => {
  try {
    return (req, res, next) => {
        
      const { error } = getSchema(api).validate(req.body);
      if (error) {
        res.json({
          status:"error",
          error: error.details[0].message,
        });
        return;
      }
      next();
    };
  } catch (error) {

    res.json({
      status:"error",
      error: "api validation failed:(",
    });
  }
};

module.exports = validate;
