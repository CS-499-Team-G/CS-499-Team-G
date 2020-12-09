const router = require("express").Router();
let Shipment = require("../models/shipments.model");
const { check, validationResult } = require("express-validator"); // Allows us to use the express-validator to validate data from webpage https://express-validator.github.io/docs/

router.route("/").get((req, res) => {
	// Returns all shipments found in the database
	Shipment.find()
		.then((shipments) => res.contentType("html").send(shipments))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/incoming").post((req, res) => {
	// Returns all incoming shipments found in the database
	Shipment.find({ traffic: "Incoming" })
		.then((shipments) => res.json(shipments))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/outgoing").post((req, res) => {
	// Returns all outgoing shipments found in the database
	Shipment.find({ traffic: "Outgoing" })
		.then((shipments) => res.json(shipments))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
	const traffic = req.body.traffic;
	var driver = req.body.driver;

	const { firstName, lastName } = driver.split("S");
	console.log("First Name: " + firstName + "Last Name: " + lastName);
	driver = { firstName, lastName };

	const oCompany = req.body.oCompany;
	const oStreetAddress = req.body.oStreetAddress;
	const oCity = req.body.oCity;
	const oState = req.body.oState;
	const oZip = req.body.oZip;
	const origin = { oCompany, oStreetAddress, oCity, oState, oZip };

	const dCompany = req.body.dCompany;
	const dStreetAddress = req.body.dStreetAddress;
	const dCity = req.body.dCity;
	const dState = req.body.dState;
	const dZip = req.body.dZip;
	const destination = { dCompany, dStreetAddress, dCity, dState, dZip };

	const vehicleID = req.body.vehicleID;
	const departureDate = req.body.departureDate;
	const arrivalDate = req.body.arrivalDate;
	const arrivalStatus = req.body.arrivalStatus;
	const payment = req.body.payment;

	// Log to the console to see if we are receiving requests
	console.log(req.body);

	const newShipment = new Shipment({
		traffic,
		driver,
		origin,
		destination,
		vehicleID,
		departureDate,
		arrivalDate,
		arrivalStatus,
		payment,
	});

	newShipment
		.save()
		.then((page) =>
			res.sendFile(path.resolve(__dirname, "..", "..", "pages", "reports.html"))
		)
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id/item").post((req, res) => {
	const { id, name, quantity, cost, backOrder } = req.body;
	console.log(req.body);

	const item = { name, quantity, cost, backOrder };

	const orderCost = quantity * cost;
	console.log("Order cost: " + orderCost);

	Shipment.findOne({ _id: id }, { "manifest.totalCost": 1 })
		.then((result) => checkArray(result, res))
		.catch((err) => res.status(400).json("Error: " + err));

	/**
	 * Summary. Check if the provided username exists. This function
	 * returns an array containing all the infornation of every user.
	 * @param array Mongodb query returns an array containing the
	 * users with a given user name.
	 */
	function checkArray(queryResult, res) {
		console.log("Check array function");

		object = JSON.stringify(queryResult);
		json = JSON.parse(object);

		try {
			totalCost = json.manifest.totalCost;
			manifest = newTotalCost(totalCost);
		} catch (err) {
			console.log("Total cost not defined.");
			newTotalCost();
		}

		//updateShipment(manifest);
	}

	function newTotalCost(totalCost) {
		totalCost = totalCost || 0;
		console.log("Total cost in database: " + totalCost);

		console.log(
			"Total cost (" +
				totalCost +
				") + Order cost (" +
				orderCost +
				")" +
				" = Look down...."
		);
		totalCost = orderCost + totalCost; // Remember to get totalCost from existing totalCost
		console.log("Total cost (" + totalCost + ")");

		const totalBalance = totalCost + 10;
		console.log("Total balance: " + totalBalance);

		updateShipment(totalCost, totalBalance);
	}

	function addShipItem(newItem) {
		console.log("New item: " + newItem);
		Shipment.updateOne({ _id: id }, { $push: { "manifest.items": newItem } })
			.then((update) => res.json(update))
			.catch((err) => res.status(400).json("Error: " + err));
	}

	function updateShipment(totalCost, totalBalance) {
		Shipment.updateOne(
			{ _id: id },
			{
				$set: {
					"manifest.totalCost": totalCost,
					"manifest.totalBalance": totalBalance,
				},
			}
		)
			.then((shipments) => addShipItem(item))
			.catch((err) => res.status(400).json("Error: " + err));
	}
});

router.route("/:id/driver").post((req, res) => {
	const id = req.body.id;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const middleName = req.body.middleName;
	const fullName = { firstName, middleName, lastName };

	Shipment.updateOne({ _id: id }, { $set: { driver: fullName } })
		.then((shipments) => res.json(shipments))
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
