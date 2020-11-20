const mongoose = require('mongoose');

// Needed to define the schema for a "table"
const Schema = mongoose.Schema;

const customerAddress = new Schema({
    streetAddress: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zip: {
      type: Number
    }
  });

const itemSchema = new Schema({
    name: {
        type: String
    },
    quantity: {
        type: Number
    },
    cost: Number
});

const manifestSchema = new Schema({
    items: itemSchema,
    totalCost: Number, //  Sum of the costs of all the orders in a shipment
    totalBalance: Number // Sum of the costs pluys shipping and handling
});

const shipmentSchema = new Schema ({
    traffic: {
        type: String,
        enum: ['Outgoing', 'Incoming']
    },
    company: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
      },
    /*address: customerAddress,
    vehicleID: Number, // Change later to look only use valid IDs for the vehicles
    departureDate: Date,
    arrivalDate: Date,
    arrivalStatus: Boolean,
    *///drivers: String, // Make another schema data
    //manifest: manifestSchema
});

const Shipment = mongoose.model('shipment', shipmentSchema);

module.exports = Shipment;