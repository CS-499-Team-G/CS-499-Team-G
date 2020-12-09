function addShipment() {
	var req = new XMLHttpRequest();

	req.open("POST", "http://68.93.20.191:5000/shipments/add", false);
	req.send(null);

	var newVehicle = JSON.parse(req.responseText);
	//payrollTable(payrollJson);
}
