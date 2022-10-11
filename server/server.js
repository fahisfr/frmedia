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
const auth = require("./middleware/auth");
const path = require("path");
const fileUpload = require("express-fileupload");
const errorHandler = require("./config/errorHandler");
const apiValidation = require("./middleware/apiValidation");
const dbUser = require("./dbSchemas/user");
const dbPost = require("./dbSchemas/post");
const notifications = require("./controllers/getAllNotifications");
const objectId = require("mongoose").Types.ObjectId;
const db = require("./controllers/helper");

dbConn();

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(bodyParser.json());
app.use(fileUpload());

app.post("/login", apiValidation("login"), require("./controllers/login"));
app.post("/signup", require("./controllers/signUp"));

app.use("/auth", auth, require("./controllers/auth"));
app.use("/home", auth, require("./controllers/home"));
app.use("/post", auth, require("./routes/post"));
app.use("/comment", auth, require("./routes/comment"));
app.use("/user", auth, require("./routes/user"));
app.use("/verify", require("./routes/verify"));
app.use("/notifications", auth, require("./routes/notification"));
app.post("/addpost", auth, require("./controllers/addPost"));
app.post("/addcomment", auth, require("./controllers/addComment"));
app.post("/edit-profile", auth, require("./controllers/editProfile"));
app.get("/top-hash-tags", require("./controllers/getTopHashTags"));
app.get("/explore", auth, require("./controllers/exploer"));
app.get("/hashtage/:tage", auth, require("./controllers/getTaggedPosts"));
app.get("/notifications", auth, require("./controllers/getAllNotifications"));
app.get("/search/:text", require("./controllers/search"));
app.post("/delete-post", require("./controllers/deletePost"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
