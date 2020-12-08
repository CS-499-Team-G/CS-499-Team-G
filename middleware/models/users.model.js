const mongoose = require("mongoose");

// Needed to define the schema for a "table"
const Schema = mongoose.Schema;

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

const employeeAddressSchema = new Schema({
	streetAddress: {
		type: String,
	},
	city: {
		type: String,
	},
	state: {
		type: String,
	},
	zip: {
		type: Number,
	},
});

const userSchema = new Schema(
	{
		userName: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 3,
		},
		title: {
			type: String,
			enum: [
				"President",
				"Chief Financial Officer",
				"Office Personnel",
				"Driver",
			],
			required: true,
		},
		password: {
			type: String,
		},
		fullName: employeeNameSchema,
		address: employeeAddressSchema,
		payRate: {
			type: Number,
		},
		tenure: {
			type: Number,
			required: true,
		},
		assignment: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "shipment",
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("user", userSchema);

module.exports = User;
