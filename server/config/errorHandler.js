

const errorHandler = (err, req, res, next) => {
  console.log(err)
  res.json({ status: "error", error: "Internal server error" });
  
};

module.exports = errorHandler;
