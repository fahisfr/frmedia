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
const objectId = require("mongoose").Types.ObjectId;

dbConn();

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(bodyParser.json());
app.use(fileUpload());

app.use("/auth", auth, require("./controllers/auth"));
app.post("/login", apiValidation("login"), require("./controllers/login"));
app.post("/signup", require("./controllers/signUp"));
app.use("/home", auth, require("./controllers/home"));
app.use("/post", auth, require("./routes/post"));
app.use("/comment", auth, require("./routes/comment"));
app.use("/user", auth, require("./routes/user"));
app.use("/verify", require("./routes/verify"));
app.post("/addpost", auth, require("./controllers/addPost"));
app.post("/addcomment", auth, require("./controllers/addComment"));
app.post("/reply-to-comment", auth, require("./controllers/replyToComment"));
app.post("/edit-profile", auth, require("./controllers/editProfile"));
app.get("/top-hash-tags", require("./controllers/getTopHashTags"));
app.get("/explore", require("./controllers/exploer"));
app.get("/hashtage/:tage",require("./controllers/hashTage"))

app.use(errorHandler);



app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
