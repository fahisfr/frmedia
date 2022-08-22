

const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.json({ status: "error", message: "Internal server error" });
  
};

module.exports = errorHandler;
