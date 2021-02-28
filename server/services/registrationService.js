const fileService = require("./fileService");
const { v4: uuidv4 } = require("uuid");

exports.authenticate = (credential) => {
  const { username, email, password } = { ...credential };
  const authObj = {
    validUsername: false,
    validEmail: false,
    validPassword: false,
    isValid: false,
  };

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
    // add a unique id to the user object
    credential.Id = uuidv4();
    
    // add the user to users.json
    addUser(credential);
    authObj.isValid = true;
  }

  // valid user object ? return true : return formatted error object
  const auth0 = authObj.isValid ? { isValid: true } : formatErrors(authObj);
  return auth0;
};

/* 
  Writes a user object to users.json
 */
function addUser(user) {
  fileService.writeFileContents("../data/users.json", user);
}

/* 
  Checks for whitespace in a string using a regex pattern
 */
function hasWhiteSpace(s) {
  return /\s/g.test(s);
}

/* 
  Validates the username field
 */
function usernameIsValid(username) {
  if (username.length < 255 && !hasWhiteSpace(username)) {
    return true;
  } else {
    return false;
  }
}

/* 
  Validates the email field using a regex pattern
 */
function emailIsValid(email) {
  if (/\S+@\S+\.\S+/.test(email) && !hasWhiteSpace(email)) {
    return true;
  } else {
    return false;
  }
}

/* 
  Validates the password field using a regex pattern
 */
function passwordIsValid(password) {
  var passw = /^[A-Za-z]\w{7,14}$/;
  if (password.match(passw) && !hasWhiteSpace(password)) {
    return true;
  } else {
    return false;
  }
}

// format errors for display on returned webpage
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
