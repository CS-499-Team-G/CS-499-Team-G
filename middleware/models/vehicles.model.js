const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inspectionsSchema = new Schema ({
    date: {type: Date},
    inspections:{type: String},   

})

const repairSchema = new Schema({
    description:{type: String},
    parts:{type: String},
    supplier: {type: String}
}) 

const maintenanceSchema = new Schema({
    
    maintenance:{type: String},
    repairRecords: repairSchema,
    inspectionsRecords: inspectionsSchema,
});


//reports schema

const vehicles = new Schema({

    brand:{type: String},
    year:{type: Number},
    model:{type: String},
    kind:{type: String}, 
    maintenanceRecord: maintenanceSchema,
    
}); 

const Vehicles = mongoose.model('vehicles', vehicles);
module.exports = Vehicles;

