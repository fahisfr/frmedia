require("dotenv").config();

const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dbConn = require("./config/dbConn");
const dbUser = require("./dbSchemas/user");
const { ApolloServer } = require("apollo-server");
const resolvers = require("./graphQl/resolvers");
const { typeDefs } = require("./graphQl/typeDefs");


dbConn();
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

const server = new ApolloServer({ typeDefs, resolvers });



server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
