require("dotenv").config();

const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dbConn = require("./config/dbConn");
const corsOptions = require("./config/corsOptions");
const dbUser = require("./dbSchemas/user");

const path = require("path");
const errorHandler = require("./config/errorHandler");
const apiValidation = require("./middleware/apiValidation");
const { auth, authRequied } = require("./middleware/auth");
const upload = require("./config/multer");

dbConn();

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(bodyParser.json());
app.post("/login", apiValidation("login"), require("./controllers/login"));
app.post("/signup", require("./controllers/signUp"));
app.post("/nextauth", require("./controllers/nextAuth"));
app.use("/verify", require("./routes/verify"));
app.get("/top-hash-tags", require("./controllers/getTopHashTags"));
app.get("/search/:text", require("./controllers/search"));

app.use("/post", auth, require("./routes/post"));
app.get("/explore", auth, require("./controllers/exploer"));
app.get("/hashtage/:tage", auth, require("./controllers/getTaggedPosts"));

app.use("/user", require("./routes/user"));
app.use("/account", require("./routes/account"));

app.post("/delete-post", authRequied, require("./controllers/deletePost"));
app.use("/home", authRequied, require("./controllers/home"));
app.use("/notifications", authRequied, require("./routes/notification"));
app.post("/addpost", authRequied, upload.single("file"), require("./controllers/addPost"));
app.use("/comment", authRequied, require("./routes/comment"));
app.post(
  "/addcomment",
  authRequied,
  upload.single("file"),
  require("./controllers/addComment")
);


app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
