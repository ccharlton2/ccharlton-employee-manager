// require dotenv package to read the properties in the .env file.
// never upload .env file to git.
require("dotenv").config();
//import the express module
const express = require("express");
// import the path utils from Node.
const path = require("path");
const cors = require("cors");
const cookSession = require("cookie-session");

// Importing our Login Service Used With the POST Login Route
const loginService = require("./services/loginService");
const registrationService = require("./services/registrationService");
const usersService = require("./services/getUsersService");

// create an instance of express
const app = express();

// read the value of PORT NODE_EVN variable in the .env file
// when the index.js file starts up this file is read in and
// we can set configuration variables for the application.
// never upload to git...
const PORT = process.env.PORT || 5000;

// Middleware For Cross Origin Resource SHaring
app.use(cors());

//To get access to the name value pairs send in the message Body of POST Request.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session Middleware
app.use(
  cookSession({
    name: "session",
    keys: ["SDFLU9iw2308dlsfuwe2adfl", "LDFA34gsdfgFOPW2323DA7FS2"],
  })
);

// Setup Template Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

//Middleware Serving Static Pages from client directory
// second parameter is an configuration object of how we want
// the static file server to run.
app.use(
  express.static(path.join(__dirname, "../client"), {
    extensions: ["html", "htm"],
  })
);

// get users
app.get("/api/v1/users", (req, res) => {
  res.send(usersService.getUsers());
});

// home
app.get("/", (req, res) => {
  if (req.session.isValid) {
    res.render("index");
  } else {
    res.sendFile(path.join(__dirname, "../client/index.html"));
  }
});

app.get("/dashboard", (req, res) => {
  if (req.session.isValid) {
    res.render("dashboard");
  } else {
    res.sendFile(path.join(__dirname, "../client/index.html"));
  }
});

app.get("/dashboard", (req, res) => {
  if (req.session.isValid) {
    res.render("dashboard");
  } else {
    res.redirect("/login");
  }
});

app.get("/register", (req, res) => {
  res.render("register", {
    usernameWarning: "",
    passwordWarning: "",
    emailWarning: "",
    email: "",
    password: "",
    username: "",
  });
});

app.post("/register", (req, res) => {
  const credentials = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  // check credentials
  const isValidUser = registrationService.authenticate(credentials);

  // check if credentials were valid
  if (isValidUser.isValid) {
    if (!req.session.isValid) {
      req.session.isValid = true;
    }
    res.redirect("login");
  }

  // check if credentials were not valid
  if (!isValidUser.isValid) {
    // return register page with error messages
    res.render("register", {
      usernameWarning: isValidUser.usernameWarning,
      emailWarning: isValidUser.emailWarning,
      passwordWarning: isValidUser.passwordWarning,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
  }
});

app.get("/login", (req, res) => {
  res.render("login", {
    passwordWarning: "",
    emailWarning: "",
    email: "",
    password: "",
  });
});

app.post("/login", (req, res) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password,
  };

  const isValidUser = loginService.authenticate(credentials);

  // if isValidUser has a user returned
  if (isValidUser.user !== null) {
    // set a session value isValid
    if (!req.session.isValid) {
      req.session.isValid = true;
    }
    res.redirect("dashboard");
  }

  if (isValidUser.user === null) {
    res.render("login", {
      emailWarning: isValidUser.emailWarning,
      passwordWarning: isValidUser.passwordWarning,
      email: req.body.email,
      password: req.body.password,
    });
  }
});

app.post("/login", (req, res) => {
  // POST name value pairs in body request
  const credentials = {
    email: req.body.email,
    password: req.body.password,
  };

  const isValidUser = loginService.authenticate(credentials);
  res.end();
});

// Final Middleware
// Catch all for any request not handled while express was
// processing requests.
// Returns 404 Page from the client directory.
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../client/404.html"));
});

// Tell express app to listen for incomming request on a specific PORT
app.listen(PORT, () => {
  console.log(`server started on http://localhost:5000`);
});
