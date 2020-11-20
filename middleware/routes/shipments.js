const router = require('express').Router();
let Shipment = require('../models/shipments.model');
const{check, validationResult} = require('express-validator'); // Allows us to use the express-validator to validate data from webpage https://express-validator.github.io/docs/

router.route('/').get((req, res) => {

    // Returns all shipments found in the database
    Shipment.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add').post((req, res) => {

    const traffic = req.body.traffic;
    const company = req.body.company;
    /*
    const streetAddress = req.body.streetAddress;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    const address = {streetAddress, city, state, zip}
  
    const vehicleID = req.body.vehicleID;
    const departureDate = req.body.departureDate;
    const arrivalDate = req.body.arrivalDate;
    const arrivalStatus = req.body.arrivalStatus;
    //const drivers = req.body.drivers;
    
    const items = req.body.items;
    items.forEach(items => {
        const totalCost = totalCost + item.cost;
        console.log('Item cost' + item.cost)
        console.log('Total cost' + totalCost);
    });
    const totalBalance = totalCost + 10;
    const manifest = {items, totalCost, totalBalance};
    */
    // Log to the console to see if we are receiving requests
    console.log(req.body);
  
    const newShipment = new Shipment({traffic, company,
      /*address,
      vehicleID,
      departureDate,
      arrivalDate,
      arrivalStatus,
      items
      */
    });
  
    newShipment.save()
      .then(() => res.json('Shipment added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
module.exports = router;