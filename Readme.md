# Employee Manager

## What is this?
This is a project created to showcase user registration and authentication via custom middleware and cookie based authentication.

## What can this project do?
Currently you can register a new user that will be saved to a .json file [users.json](/server/data/user.json). 

You can see a list of users by clicking on the "users" nav-link in either home, login, or register.

You can login as any registered user and upon successful login will be able to access the dashboard which is not accessible until you are authenticated.

Both client and server side validation are used for login and registration.

## How to run this project
Run the following commands in the root directory

1. `npm install`
2. `npm run server` (development) OR `npm run start` (production)

## Packages
This project makes use of the following packages

- [EJS](https://ejs.co/)
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)