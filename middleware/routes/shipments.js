const router = require('express').Router();
let Shipment = require('../models/shipments.model');
const{check, validationResult} = require('express-validator'); // Allows us to use the express-validator to validate data from webpage https://express-validator.github.io/docs/

router.route('/').get((req, res) => {

    // Returns all shipments found in the database
    Shipment.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/incoming').post((req, res) => {

  // Returns all shipments found in the database
  Shipment.find( {traffic: "Incoming"} )
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});  

router.route('/outgoing').post((req, res) => {

  // Returns all shipments found in the database
  Shipment.find( {traffic: "Outgoing"} )
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/add').post((req, res) => {

    const traffic = req.body.traffic;
    const driver = req.body.driver;

    const oCompany = req.body.oCompany;
    const oStreetAddress = req.body.oStreetAddress;
    const oCity = req.body.oCity;
    const oState = req.body.oState;
    const oZip = req.body.oZip;
    const origin = {oCompany, oStreetAddress, oCity, oState, oZip}
  
    const dCompany = req.body.dCompany;
    const dStreetAddress = req.body.dStreetAddress;
    const dCity = req.body.dCity;
    const dState = req.body.dState;
    const dZip = req.body.dZip;
    const destination = {dCompany, dStreetAddress, dCity, dState, dZip}

    //const vehicleID = req.body.vehicleID;
    const departureDate = req.body.departureDate;
    const arrivalDate = req.body.arrivalDate;
    const arrivalStatus = req.body.arrivalStatus;
    const payment = req.body.payment;

    /*
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
  
    const newShipment = new Shipment({traffic,
      driver,
      origin,
      destination,
      //vehicleID,
      departureDate,
      arrivalDate,
      arrivalStatus,
      payment
    });
  
    newShipment.save()
      .then(() => res.json('Shipment added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
module.exports = router;