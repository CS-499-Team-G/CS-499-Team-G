function getData() {
	var req = new XMLHttpRequest();
	if (document.getElementById("selection").value === "3") {
		req.open("POST", "http://68.93.20.191:5000/shipments/incoming", false);
		req.send(null);

		var jsonObj = JSON.parse(req.responseText);
		shipmentTable(jsonObj);
	}
}

function shipmentTable(data) {
	var table = document.getElementById("reports");

	// Create header elements and initial header row
	var headerRow = document.createElement("tr");
	var traffic = document.createElement("th");
	var origin = document.createElement("th");
	var destination = document.createElement("th");
	var vim = document.createElement("th");
	var depart = document.createElement("th");
	var arrive = document.createElement("th");
	var status = document.createElement("th");
	var payment = document.createElement("th");

	// Populate header elements with text nodes
	traffic.appendChild(document.createTextNode("Traffic"));
	origin.appendChild(document.createTextNode("Origin"));
	destination.appendChild(document.createTextNode("Destination"));
	vim.appendChild(document.createTextNode("Vehicle ID"));
	depart.appendChild(document.createTextNode("Departure Date"));
	arrive.appendChild(document.createTextNode("Arrival Date"));
	status.appendChild(document.createTextNode("Status"));
	payment.appendChild(document.createTextNode("Paid"));

	// Append the header elements to the row element
	headerRow.appendChild(traffic);
	headerRow.appendChild(origin);
	headerRow.appendChild(destination);
	headerRow.appendChild(vim);
	headerRow.appendChild(depart);
	headerRow.appendChild(arrive);
	headerRow.appendChild(status);

	// Append the row to the table
	table.appendChild(headerRow);

	for (let i = 0; i < jsonObj.length; i++) {
		// Create row element
		var row = document.createElement("tr");

		// Create each data field element
		var cell1 = document.createElement("td");
		var cell2 = document.createElement("td");
		var cell3 = document.createElement("td");
		var cell4 = document.createElement("td");
		var cell5 = document.createElement("td");
		var cell6 = document.createElement("td");
		var cell7 = document.createElement("td");
		var cell8 = document.createElement("td");

		// Populate each data field with a text node
		cell1.appendChild(document.createTextNode(data[i].traffic));
		cell2.appendChild(document.createTextNode(data[i].origin.oCompany));
		cell3.appendChild(document.createTextNode(data[i].destination.dCompany));
		cell4.appendChild(document.createTextNode("N/A"));
		cell5.appendChild(document.createTextNode(data[i].departureDate));
		cell6.appendChild(document.createTextNode(data[i].arrivalDate));
		if (data[i].arrivalStatus) {
			cell7.appendChild(document.createTextNode("Arrived"));
		} else {
			cell7.appendChild(document.createTextNode("In Process"));
		}
		if (data[i].payment) {
			cell8.appendChild(document.createTextNode("Yes"));
		} else {
			cell8.appendChild(document.createTextNode("No"));
		}
	}
}
