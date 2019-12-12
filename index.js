const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoClient = require("mongodb").MongoClient;
var auth = require("./routes/auth.js");
var studio = require("./routes/studios/studio");
var projects = require("./routes/projects/project");
var drawer = require("./routes/drawer/drawer");
var user = require("./routes/users/user");
var dashboard = require("./routes/dashboard/dashboard");
var allProjects = require("./routes/allProjects/allProjects");
var home = require("./routes/home/home");
var chat = require("./routes/dashboard/chat");
var orders = require("./routes/orders/orders");
require("dotenv").config();
var checkToken = require("./checkToken.js");
var adminConfig = require("./routes/adminConfig");
var app = express();
var port = 3000;
// app locals
app.locals.accountSid;
accountSid = process.env.accound_sid;
app.locals.authToken;
authToken = process.env.auth_token;
app.locals.client;
client = require("twilio")(accountSid, authToken);
app.locals.db;
app.locals.url;
url = process.env.URL;
app.locals.ObjectId;
ObjectId = require("mongodb").ObjectID;
app.locals.TwillioNumber;
TwillioNumber = "+14155238886";
app.locals.sessionSecrate;
sessionSecrate = "HakkaLallaMapaJUUUUramjikijai";

mongoClient.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, client) => {
    if (err) throw err;
    db = client.db("StudioManager");
  }
);

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: sessionSecrate,
    resave: true,
    saveUninitialized: true
  })
);
// Route Setup Start
app.use("/home", checkToken, home);
app.use("/auth", auth);
app.use("/studios", studio);
app.use("/projects", projects);
app.use("/drawer", drawer);
app.use("/users", user);
app.use("/dashboard", dashboard);
app.use("/allProjects", allProjects);
app.use("/chat", chat);
app.use("/adminConfig", adminConfig);
app.use("/orders", orders);
// Route Setup End
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.listen(port, () => console.log(`Server Running on port ${port}`));
