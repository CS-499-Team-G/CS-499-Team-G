const router = require("express").Router();
let User = require("../models/users.model");
const { check, validationResult } = require("express-validator"); // Allows us to use the express-validator to validate data from webpage https://express-validator.github.io/docs/

/*  .get == > retrieve the data from the webpage without altering
    .post ==> retrieve the data from the webpage and alter
*/

router.route("/").get((req, res) => {
	const username = req.body.username;
	const title = req.body.title;
	res.send("User route!");

	/*User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));*/
});

router.route("/add").post((req, res) => {
	const userName = req.body.username;
	const title = req.body.title;

	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const middleName = req.body.middleName;
	const fullName = { firstName, middleName, lastName };

	const streetAddress = req.body.streetAddress;
	const city = req.body.city;
	const state = req.body.state;
	const zip = req.body.zip;
	const address = { streetAddress, city, state, zip };

	const payRate = req.body.payRate;
	const tenure = req.body.tenure;

	// Log to the console to see if we are receiving requests
	console.log(req.body);

	const newUser = new User({
		userName,
		title,
		fullName, //: {firstName: firstName, middleName: middleName, lastName: lastName}
		address,
		payRate,
		tenure,
	});

	newUser
		.save()
		.then(() => res.json("User added!"))
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
