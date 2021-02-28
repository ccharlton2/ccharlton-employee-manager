/* 
  Login Service Will Authenticate an email and password
  return a true or false response.
  false returns will keep users on the login page with errors
  true will redirect user to the dashboard.html
*/
const fileService = require("./fileService");

// check user credentials and try to find a match
exports.authenticate = (credential) => {
  const { email, password } = { ...credential };
  const users = fileService.getFileContents("../data/users.json");

  const authUser = users.reduce(
    (authObj, user) => {
      if (user.email === email) {
        authObj.validEmail = true;
      }

      if (user.password === password) {
        authObj.validPassword = true;
      }

      if (authObj.validEmail === true && authObj.validPassword === true) {
        authObj.user = user;
      }

      return authObj;
    },
    { validEmail: false, validPassword: false, user: null }
  );

  const auth0 = authUser.user
    ? { user: authUser.user }
    : formatErrors(authUser);
  return auth0;
};

// format errors for display on returned webpage
const formatErrors = function (user) {
  let passwordWarning = "";
  let emailWarning = "";

  if (user.validPassword === false) {
    passwordWarning = `password doesn't seem to be correct`;
  }
  if (user.validEmail === false) {
    emailWarning = `email doesn't seem to be correct`;
  }

  return { user: null, emailWarning, passwordWarning };
};
