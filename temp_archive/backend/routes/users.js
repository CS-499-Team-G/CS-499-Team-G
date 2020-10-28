const router = require('express').Router();
let User = require('../models/users.model');
const{check, validationResult} = require('express-validator'); // Allows us to use the express-validator to validate data from webpage https://express-validator.github.io/docs/

/*  .get == > retrieve the data from the webpage without altering
    .post ==> retrieve the data from the webpage and alter
*/

// Login for a specific user
router.route('/login').get((req, res) => {
  
  // Get the username and password from the req.body
  const {name, password} = req.body;

  /** 
   * Summary. Check if the provided username exists. This function
   * returns an array containing all the infornation of every user.
   * @param userName name of a user account from a webpage request.
  */
  User.find( {userName: name} )
    .then(users => checkArray(users))
    .catch(err => res.status(400).json('Error: ' + err));

 /** 
   * Summary. Check if the provided username exists. This function
   * returns an array containing all the infornation of every user.
   * @param array Mongodb query returns an array containing the
   * users with a given user name.
  */
  function checkArray(array){
    if(!array.length == 0){
      res.json(users)
    }else{
      res.status(400).json('Error: User not found')
    }

  };

});

// Show all users
router.route('/').get((req, res) => {
  
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Create a user and add to the database
router.route('/add').post((req, res) => {
  const userName = req.body.username;
  const title = req.body.title;
  const password = req.body.password;

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const middleName = req.body.middleName;
  const fullName = {firstName, middleName, lastName};

  const streetAddress = req.body.streetAddress;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const address = {streetAddress, city, state, zip}

  const payRate = req.body.payRate;
  const tenure = req.body.tenure;

  // Log to the console to see if we are receiving requests
  console.log(req.body);

  const newUser = new User({userName, title,
    fullName,
    address,
    payRate,
    tenure
  });

  // Save the newly created user in Mongodb
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;