const corsOptions = {
  origin: ["http://localhost:3000", process.env.DOMAIN_NAME],
  credentials: true,
};

module.exports = corsOptions;
