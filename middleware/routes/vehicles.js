const router = require('express').Router();
let Vehicles = require('../models/vehicles.model');
const {check, validationResult} = require('express-validator');


router.route('/').get((req, res) => {
    Vehicles.find()
    .then(vehicles => res.json(vehicles))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => 
{
    const brand = req.body.brand;
    const year = req.body.year;
    const model = req.body.model;
    const kind = req.body.kind;
    const shipment = req.body.shipment;

    const date = req.body.date;
    const inspections = req.body.inspections;
    const inspectionsRecords = {inspections, date};

    const description = req.body.description;
    const parts = req.body.parts;
    const supplier = req.body.supplier;
    const repairRecords = {description, parts, supplier};

    const maintenance = req.body.maintenance;
    const maintenanceRecord = {maintenance, repairRecords, inspectionsRecords}; 

    console.log(req.body);

const newVehicle = new Vehicles({

    brand,
    year,
    model,
    kind,
    shipment,
    maintenanceRecord
});
    
newVehicle.save()
.then(() => res.json('Vehicle added!'))
.catch(err => res.status(400).json('Error'+err))
})


module.exports = router;