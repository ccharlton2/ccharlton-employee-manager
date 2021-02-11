/* 
    Login Service will authenticate an email and password
    return a true or false response
    false returns will keep users on the login page with errors
    true will redirect the user to dashboard.html
*/

const fileService = require('./fileService')

// login route
// pass the authenticate function {email, password}
// read the user.json file to get the data
// loop over the data and check the email for a match
// if the email matches check the password
const authenticate = (credential) => {
    const {email, password} = {...credential}
    const users = fileService.getFileContents('../data/users.json');
    // making the test
    // array... sort, filter, map, reduce, find, forEach
    // need to know what the return is
}

authenticate({email:"user@gmail.com", password:"1234"})