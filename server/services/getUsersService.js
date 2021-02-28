const fileService = require("./fileService");

exports.getUsers = () => {
    let users = fileService.getFileContents('../data/users.json');
    return users;
}