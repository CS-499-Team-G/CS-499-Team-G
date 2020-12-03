function getData() {
	var req = new XMLHttpRequest();
	req.open("GET", "http://68.93.20.191:5000/shipments/", false);
	req.send(null);

	var jsonObj = JSON.parse(req.responseText);
	console.log(jsonObj);
}

function reportDecision() {
	if (document.getElementById("selection").value === "3") {
		shipmentTable();
	}
}

function shipmentTable(data) {
	var table = document.getElementById("reports");

	// Create header elements and initial header row
	var headerRow = document.createElement("tr");
	var traffic = document.createElement("th");
	var company = document.createElement("th");
	var address = document.createElement("th");
	var vim = document.createElement("th");
	var depart = document.createElement("th");
	var arrive = document.createElement("th");
	var status = document.createElement("th");

	// Populate header elements with text nodes
	traffic.appendChild(document.createTextNode("Traffic"));
	company.appendChild(document.createTextNode("Company"));
	address.appendChild(document.createTextNode("Address"));
	vim.appendChild(document.createTextNode("Vehicle ID"));
	depart.appendChild(document.createTextNode("Departure Date"));
	arrive.appendChild(document.createTextNode("Arrival Date"));
	status.appendChild(document.createTextNode("Status"));

	// Append the header elements to the row element
	headerRow.appendChild(traffic);
	headerRow.appendChild(company);
	headerRow.appendChild(address);
	headerRow.appendChild(vim);
	headerRow.appendChild(depart);
	headerRow.appendChild(arrive);
	headerRow.appendChild(status);

	// Append the row to the table
	table.appendChild(headerRow);

	var dataRow = document.createElement("tr");
	var cell1 = document.createElement("td");

	cell1.appendChild(document.createTextNode(data[0].traffic));

	dataRow.appendChild(cell1);

	table.appendChild(dataRow);
}
