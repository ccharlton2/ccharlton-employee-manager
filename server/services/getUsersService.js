/* 
  Uses the getFileContents method from fileService.js to fetch users
  data and returns the result
*/
const fileService = require("./fileService");

exports.getUsers = () => {
    let users = fileService.getFileContents('../data/users.json');
    return users;
}