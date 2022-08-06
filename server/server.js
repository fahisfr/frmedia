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
const corsOptions = require("./config/corsOptions");
const auth = require("./middleware/auth");
const path = require("path");
const fileUpload = require("express-fileupload");
const shrap = require("sharp");
const sharp = require("sharp");

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});





server.start().then(() => {
  server.applyMiddleware({ app, cors: corsOptions });
});

app.listen(port);
