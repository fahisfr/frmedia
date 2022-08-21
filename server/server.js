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
const dbPost = require("./dbSchemas/post");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./graphQls/resolvers");
const { typeDefs } = require("./graphQls/typeDefs");
const corsOptions = require("./config/corsOptions");
const auth = require("./middleware/auth");
const path = require("path");
const fileUpload = require("express-fileupload");
const { INTERNAL_SERVER_ERROR } = require("./config/customErrors");
const jwt = require("jsonwebtoken");

dbConn();

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(bodyParser.json());
app.use(fileUpload());

app.post("/addpost", auth, require("./controllers/addPost"));
app.post("/addcomment", auth, require("./controllers/addComment"));
app.post("/reply-to-comment", auth, require("./controllers/replyToComment"));
app.post("/edit-profile", auth, require("./controllers/editProfile"));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    try {
      const token = req.cookies.auth_token;
      if (token) {
        jwt.verify(
          req.cookies.auth_token,
          process.env.TOKEN_SECRET,
          (err, decode) => {
            if (err) {
              throw new Error("unauthorized");
            }
            req.user = decode;
          }
        );
      }

      return {
        req,
        res,
        INSERR: INTERNAL_SERVER_ERROR,
      };
    } catch (error) {
      throw new Error("oops somthing went wrong:(");
    }
  },
});

server.start().then(() => {
  server.applyMiddleware({ app, cors: corsOptions });
});

app.listen(port);
