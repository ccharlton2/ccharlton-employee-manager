const fileService = require("./fileService");
const { v4: uuidv4 } = require('uuid');

exports.authenticate = (credential) => {
  const { username, email, password } = { ...credential };
  const authObj = { validUsername:false, validEmail: false, validPassword: false, isValid: false };

  if (emailIsValid(email)) {
    authObj.validEmail = true;
  }

  if (passwordIsValid(password)) {
    authObj.validPassword = true;
  }

  if (usernameIsValid(username)) {
    authObj.validUsername = true;
  }

  if (authObj.validEmail === true && authObj.validPassword === true) {
    credential.Id = uuidv4();
    addUser(credential);
    authObj.isValid = true;
  }

  const auth0 = authObj.isValid ? { isValid: true } : formatErrors(authObj);
  return auth0;
};

function addUser(user) {
    fileService.writeFileContents("../data/users.json", user);
}

function hasWhiteSpace(s) {
  return /\s/g.test(s);
}

function usernameIsValid(username) {
    if (username.length <255 && !hasWhiteSpace(username)) {
        return true;
    } else {      
        return false;
    }
}

function emailIsValid(email) {
  if (/\S+@\S+\.\S+/.test(email) && !hasWhiteSpace(email)) {
    return true;
  } else {
    return false;
  }
}

function passwordIsValid(password) {
  var passw = /^[A-Za-z]\w{7,14}$/;
  if (password.match(passw) && !hasWhiteSpace(password)) {
    return true;
  } else {
    return false;
  }
}

const formatErrors = function (user) {
  let passwordWarning = "";
  let emailWarning = "";
  let usernameWarning = "";

  if (user.validUsername === false) {
    usernameWarning = `Username cannot be more than 255 characters. Cannot contain whitespace.`;
  }
  if (user.validPassword === false) {
    passwordWarning = `Password must be between 7 ands 16 characters. First character must be a letter. Cannot contain whitespace.`;
  }
  if (user.validEmail === false) {
    emailWarning = `Not a valid email format.`;
  }

  return { isValid: false, usernameWarning, emailWarning, passwordWarning };
};
