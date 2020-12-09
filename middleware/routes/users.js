const express = require("express");
const mongoose = require("mongoose");
const router = require("express").Router();
let User = require("../models/users.model.js");
const path = require("path"); // Needed so that we can serve pages
const app = express();
//app.use(express.static(path.join(__dirname, "/../../pages")));

const { check, validationResult } = require("express-validator"); // Allows us to use the express-validator to validate data from webpage https://express-validator.github.io/docs/

/*  .get == > retrieve the data from the webpage without altering
    .post ==> retrieve the data from the webpage and alter
*/

/**
 * Summary. Check if the provided username exists. This function
 * returns an array containing all the infornation of every user.
 * @param array Mongodb query returns an array containing the
 * users with a given user name.
 */
function checkArray(queryResult, type, res) {
	console.log("Check array function");
	if (type == "users") {
		model = "User";
	} else {
		model = "Assignment";
	}
	if (!queryResult.length == 0) {
		//res.json(queryResult)
		app.use(express.static(path.join(__dirname, "/../../pages")));
		console.log("Dirname: " + __dirname);
		res.sendFile(path.resolve(__dirname, "..", "..", "pages", "reports.html"));
	} else {
		throw "Query returned 0 results. Incorrect information entered.";
	}
}

function setSelection (title){
	//var selection = document.getElementById("selection");
	console.log("Set selections function");
	console.log("Title: " + title);

	if(title == "Chief Financial Officer"){
		var payroll = document.createElement("option");
		payroll.innerText = "Monthly Payroll";

		var maintenance = document.createElement("option");
		maintenance.innerText = "Total Maintenance Cost";

		var vehicle = document.createElement("option");
		vehicle.innerText = "Total Vehicle Maintenance";

		var incoming = document.createElement("option");
		incoming.innerText = "Incoming Shipments";

		var outgoing = document.createElement("option");
		outgoing.innerText = "Outgoing Shipments";

		var selectElem = document.getElementById("selection");
  		selectElem.append(element);

	}else if(title){

	}else{

	}

}

// Login for a specific user
router.route("/login").post((req, res) => {
	// Get the username and password from the req.body
	const { username, password } = req.body;

	// Log to the console to see if we are receiving requests
	console.log(req.body);

	/**
	 * Summary. Check if the provided username exists. This function
	 * returns an array containing all the infornation of every user.
	 * @param userName name of a user account from a webpage request.
	 */
	User.findOne({ userName: username, password: password })
		//.then(resp => res.json(resp))
		.then(newResult => JSON.stringify(newResult))
		.then(result => JSON.parse(result))
		.then(info => title = info.title)
		//.then(title => res.contentType("html").send(title))
		.then(page => res.sendFile(path.resolve(__dirname, "..", "..", "pages", "reports.html")))
		//.then(s => setSelection(title))
		//.catch((err) => res.status(400).json("Error: " + err));
});

// Show all users
router.route("/").get((req, res) => {
	User.find()
		.then((users) => res.json(users))
		.catch((err) => res.status(400).json("Error: " + err));
});

// Show payroll for all users
router.route("/payroll").post((req, res) => {
	User.find({}, { payRate: 1, fullName: 1, title: 1 , tenure: 1})
		.then((users) => res.json(users))
		.catch((err) => res.status(400).json("Error: " + err));
});

// Show user work assignment
router.route("/assignment").post((req, res) => {
	const username = req.body.username;

	User.findOne({ userName: username })
		.populate("assignment")
		.then((user) => res.json(user.assignment))
		.catch((err) => res.status(400).json("Error: " + err));
});

// Create a user and add to the database
router.route("/add").post((req, res) => {
	const userName = req.body.username;
	const title = req.body.title;
	const password = req.body.password;

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
	const assignment = req.body.assignment;

	// Log to the console to see if we are receiving requests
	console.log(req.body);

	const newUser = new User({
		userName,
		title,
		password,
		fullName,
		address,
		payRate,
		tenure,
		assignment,
	});

	// Save the newly created user in Mongodb
	newUser
		.save()
		.then(page => res.sendFile(path.resolve(__dirname, "..", "..", "pages", "reports.html")))
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
