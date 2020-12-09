const mongoose = require("mongoose");

// Needed to define the schema for a "table"
const Schema = mongoose.Schema;

const oCustomerAddress = new Schema({
	oCompany: {
		type: String,
	},
	oStreetAddress: {
		type: String,
	},
	oCity: {
		type: String,
	},
	oState: {
		type: String,
	},
	oZip: {
		type: Number,
	},
});

const dCustomerAddress = new Schema({
	dCompany: {
		type: String,
	},
	dStreetAddress: {
		type: String,
	},
	dCity: {
		type: String,
	},
	dState: {
		type: String,
	},
	dZip: {
		type: Number,
	},
});

const itemSchema = new Schema({
	name: {
		type: String,
	},
	quantity: {
		type: Number,
	},
	cost: Number,
	backOrder: Boolean,
});

const manifestSchema = new Schema({
	items: [itemSchema],
	totalCost: Number, //  Sum of the costs of all the orders in a shipment
	totalBalance: Number, // Sum of the costs pluys shipping and handling
});


const employeeNameSchema = new Schema({
	firstName: {
		type: String,
	},
	middleName: {
		type: String,
	},
	lastName: {
		type: String,
	},
});

const shipmentSchema = new Schema ({
    traffic: {
        type: String,
        enum: ['Outgoing', 'Incoming']
    },
    origin: oCustomerAddress,
    destination: dCustomerAddress,
    vehicleID: String,
    departureDate: Date,
    arrivalDate: Date,
    arrivalStatus: String,
    payment: String,
    driver: employeeNameSchema,
    manifest: manifestSchema
});

const Shipment = mongoose.model("shipment", shipmentSchema);

module.exports = Shipment;
