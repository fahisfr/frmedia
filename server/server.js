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
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./graphQls/resolvers");
const { typeDefs } = require("./graphQls/typeDefs");

const {graphqlUploadKoa} =require("graphql-upload");

dbConn();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());


const corss = {
  credentials: true,
  origin:"http://localhost:3000",
  exposedHeaders: ["Set-Cookie", "connection"],
};

//add cridential to the request

const server = new ApolloServer({typeDefs,resolvers,context:({req,res})=>({req,res})});

server.start().then(()=>{
  server.applyMiddleware({ app, cors: corss });
})



app.listen(port);
