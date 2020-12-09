function getData() {
	var req = new XMLHttpRequest();
	if (document.getElementById("selection").value === "1") {
		req.open("POST", "http://68.93.20.191:5000/users/payroll", false);
		req.send(null);

		var payrollJson = JSON.parse(req.responseText);
		payrollTable(payrollJson);
	} else if (document.getElementById("selection").value === "2") {
		req.open("POST", "http://68.93.20.191:5000/vehicles/maintenance", false);
		req.send(null);

		var costJson = JSON.parse(req.responseText);
		vehicleMaintenanceTable(costJson);
	} else if (document.getElementById("selection").value === "3") {
		req.open("GET", "http://68.93.20.191:5000/vehicles", false);
		req.send(null);

		var vehicleJson = JSON.parse(req.responseText);
		totalMaintenanceTable(vehicleJson);
	} else if (document.getElementById("selection").value === "4") {
		req.open("POST", "http://68.93.20.191:5000/shipments/incoming", false);
		req.send(null);

		var incomingJson = JSON.parse(req.responseText);
		incomingShipmentTable(incomingJson);
	} else if (document.getElementById("selection").value === "5") {
		req.open("POST", "http://68.93.20.191:5000/shipments/outgoing", false);
		req.send(null);

		var outgoingJson = JSON.parse(req.responseText);
		outgoingShipmentTable(outgoingJson);
	}
}

function payrollTable(data) {
	// Get table and clear if it has data already
	var table = document.getElementById("reports");
	while (table.rows.length > 0) {
		table.deleteRow(0);
	}

	// Create header elements and initial header row
	var headerRow = document.createElement("tr");
	var name = document.createElement("th");
	var title = document.createElement("th");
	var payrate = document.createElement("th");
	var tenure = document.createElement("th");

	//
	name.appendChild(document.createTextNode("Name"));
	title.appendChild(document.createTextNode("Position"));
	payrate.appendChild(document.createTextNode("Monthly Salary"));
	tenure.appendChild(document.createTextNode("Tenure"));

	// Append header elements to the row element
	headerRow.appendChild(name);
	headerRow.appendChild(title);
	headerRow.appendChild(payrate);
	headerRow.appendChild(tenure);

	// Append the row to the table
	table.appendChild(headerRow);

	table.rows[0].cells[0].addEventListener("click", function () {
		sortTable(0);
	});
	table.rows[0].cells[1].addEventListener("click", function () {
		sortTable(1);
	});

	for (let i = 0; i < data.length; i++) {
		// Create row element
		var row = document.createElement("tr");

		var cell1 = document.createElement("td");
		var cell2 = document.createElement("td");
		var cell3 = document.createElement("td");
		var cell4 = document.createElement("td");

		cell1.appendChild(
			document.createTextNode(
				data[i].fullName.firstName + " " + data[i].fullName.lastName
			)
		);
		cell2.appendChild(document.createTextNode(data[i].title));
		if (data[i].payRate) {
			cell3.appendChild(
				document.createTextNode("$" + data[i].payRate * 40 * 4)
			);
		} else {
			cell3.appendChild(document.createTextNode("Not Specified"));
		}

		cell4.appendChild(document.createTextNode(data[i].tenure));

		row.appendChild(cell1);
		row.appendChild(cell2);
		row.appendChild(cell3);
		row.appendChild(cell4);

		table.appendChild(row);
	}
}

function vehicleMaintenanceTable(data) {
	// Get table and clear if it has data already
	var table = document.getElementById("reports");
	while (table.rows.length > 0) {
		table.deleteRow(0);
	}

	// Create header elements and initial header row
	var headerRow = document.createElement("tr");
	var make = document.createElement("th");
	var model = document.createElement("th");
	var year = document.createElement("th");
	var kind = document.createElement("th");
	var maintenance = document.createElement("th");
	var description = document.createElement("th");
	var parts = document.createElement("th");
	var cost = document.createElement("th");

	// Populate header elements with text nodes
	make.appendChild(document.createTextNode("Make"));
	model.appendChild(document.createTextNode("Model"));
	year.appendChild(document.createTextNode("Year"));
	kind.appendChild(document.createTextNode("Body Style"));
	maintenance.appendChild(document.createTextNode("Maintenance"));
	description.appendChild(document.createTextNode("Description"));
	parts.appendChild(document.createTextNode("Parts"));
	cost.appendChild(document.createTextNode("Cost"));

	headerRow.appendChild(make);
	headerRow.appendChild(model);
	headerRow.appendChild(year);
	headerRow.appendChild(kind);
	headerRow.appendChild(maintenance);
	headerRow.appendChild(description);
	headerRow.appendChild(parts);
	headerRow.appendChild(cost);

	table.appendChild(headerRow);

	// Sort by make
	table.rows[0].cells[0].addEventListener("click", function () {
		sortTable(0);
	});

	// Sort by model
	table.rows[0].cells[1].addEventListener("click", function () {
		sortTable(1);
	});

	// Sort by body style
	table.rows[0].cells[3].addEventListener("click", function () {
		sortTable(3);
	});

	// Sort by maintenance
	table.rows[0].cells[4].addEventListener("click", function () {
		sortTable(4);
	});

	// Sort by description
	table.rows[0].cells[5].addEventListener("click", function () {
		sortTable(5);
	});

	// Sort by parts
	table.rows[0].cells[6].addEventListener("click", function () {
		sortTable(6);
	});

	for (let i = 0; i < data.length; i++) {
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

		cell1.appendChild(document.createTextNode(data[i].brand));
		cell2.appendChild(document.createTextNode(data[i].model));
		cell3.appendChild(document.createTextNode(data[i].year));
		cell4.appendChild(document.createTextNode(data[i].kind));
		cell5.appendChild(
			document.createTextNode(data[i].maintenanceRecord.maintenance)
		);
		cell6.appendChild(
			document.createTextNode(
				data[i].maintenanceRecord.repairRecords.description
			)
		);
		cell7.appendChild(
			document.createTextNode(data[i].maintenanceRecord.repairRecords.parts)
		);
		cell8.appendChild(
			document.createTextNode(
				"$" + data[i].maintenanceRecord.repairRecords.cost
			)
		);

		row.appendChild(cell1);
		row.appendChild(cell2);
		row.appendChild(cell3);
		row.appendChild(cell4);
		row.appendChild(cell5);
		row.appendChild(cell6);
		row.appendChild(cell7);
		row.appendChild(cell8);
		table.appendChild(row);
	}
}

function totalMaintenanceTable(data) {
	// Get table and clear if it has data already
	var table = document.getElementById("reports");
	while (table.rows.length > 0) {
		table.deleteRow(0);
	}

	// Create header elements and initial header row
	var headerRow = document.createElement("tr");
	var make = document.createElement("th");
	var model = document.createElement("th");
	var year = document.createElement("th");
	var kind = document.createElement("th");
	var maintenance = document.createElement("th");
	var description = document.createElement("th");
	var parts = document.createElement("th");
	var inspections = document.createElement("th");
	var date = document.createElement("th");

	// Populate header elements with text nodes
	make.appendChild(document.createTextNode("Make"));
	model.appendChild(document.createTextNode("Model"));
	year.appendChild(document.createTextNode("Year"));
	kind.appendChild(document.createTextNode("Body Style"));
	maintenance.appendChild(document.createTextNode("Maintenance"));
	description.appendChild(document.createTextNode("Description"));
	parts.appendChild(document.createTextNode("Parts"));
	inspections.appendChild(document.createTextNode("Inspections"));
	date.appendChild(document.createTextNode("Date"));

	headerRow.appendChild(make);
	headerRow.appendChild(model);
	headerRow.appendChild(year);
	headerRow.appendChild(kind);
	headerRow.appendChild(maintenance);
	headerRow.appendChild(description);
	headerRow.appendChild(parts);
	headerRow.appendChild(inspections);
	headerRow.appendChild(date);

	table.appendChild(headerRow);

	// Sort by make
	table.rows[0].cells[0].addEventListener("click", function () {
		sortTable(0);
	});

	// Sort by model
	table.rows[0].cells[1].addEventListener("click", function () {
		sortTable(1);
	});

	// Sort by body style
	table.rows[0].cells[3].addEventListener("click", function () {
		sortTable(3);
	});

	// Sort by maintenance
	table.rows[0].cells[4].addEventListener("click", function () {
		sortTable(4);
	});

	// Sort by description
	table.rows[0].cells[5].addEventListener("click", function () {
		sortTable(5);
	});

	// Sort by parts
	table.rows[0].cells[6].addEventListener("click", function () {
		sortTable(6);
	});

	// Sort by inspection
	table.rows[0].cells[7].addEventListener("click", function () {
		sortTable(7);
	});

	for (let i = 0; i < data.length; i++) {
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
		var cell9 = document.createElement("td");

		cell1.appendChild(document.createTextNode(data[i].brand));
		cell2.appendChild(document.createTextNode(data[i].model));
		cell3.appendChild(document.createTextNode(data[i].year));
		cell4.appendChild(document.createTextNode(data[i].kind));
		cell5.appendChild(
			document.createTextNode(data[i].maintenanceRecord.maintenance)
		);
		cell6.appendChild(
			document.createTextNode(
				data[i].maintenanceRecord.repairRecords.description
			)
		);
		cell7.appendChild(
			document.createTextNode(data[i].maintenanceRecord.repairRecords.parts)
		);
		cell8.appendChild(
			document.createTextNode(
				data[i].maintenanceRecord.inspectionsRecords.inspections
			)
		);

		var convertedDate = new Date(
			data[i].maintenanceRecord.inspectionsRecords.date
		);
		var dateString =
			(convertedDate.getMonth().toString().length > 1
				? convertedDate.getMonth() + 1
				: "0" + (convertedDate.getMonth() + 1)) +
			"/" +
			(convertedDate.getDate().toString().length > 1
				? convertedDate.getDate()
				: "0" + convertedDate.getDate()) +
			"/" +
			convertedDate.getFullYear();
		cell9.appendChild(document.createTextNode(dateString));

		row.appendChild(cell1);
		row.appendChild(cell2);
		row.appendChild(cell3);
		row.appendChild(cell4);
		row.appendChild(cell5);
		row.appendChild(cell6);
		row.appendChild(cell7);
		row.appendChild(cell8);
		row.appendChild(cell9);

		table.appendChild(row);
	}
}

function incomingShipmentTable(data) {
	// Get table and clear if it has data already
	var table = document.getElementById("reports");
	while (table.rows.length > 0) {
		table.deleteRow(0);
	}

	var pNodes = document.getElementsByTagName("p");
	for (let i = 0; i < pNodes.length; i++) {
		pNodes[i].parentNode.removeChild(pNodes[i]);
	}

	// Create header elements and initial header row
	var headerRow = document.createElement("tr");
	var origin = document.createElement("th");
	var destination = document.createElement("th");
	var vim = document.createElement("th");
	var depart = document.createElement("th");
	var arrive = document.createElement("th");
	var status = document.createElement("th");
	var payment = document.createElement("th");
	var manifest = document.createElement("th");

	// Populate header elements with text nodes
	vim.appendChild(document.createTextNode("Vehicle ID"));
	origin.appendChild(document.createTextNode("Origin"));
	destination.appendChild(document.createTextNode("Destination"));
	depart.appendChild(document.createTextNode("Departure Date"));
	arrive.appendChild(document.createTextNode("Arrival Date"));
	status.appendChild(document.createTextNode("Status"));
	payment.appendChild(document.createTextNode("Paid"));
	manifest.appendChild(document.createTextNode("Items"));

	// Append the header elements to the row element
	headerRow.appendChild(vim);
	headerRow.appendChild(origin);
	headerRow.appendChild(destination);
	headerRow.appendChild(depart);
	headerRow.appendChild(arrive);
	headerRow.appendChild(status);
	headerRow.appendChild(payment);
	headerRow.appendChild(manifest);

	// Append the row to the table
	table.appendChild(headerRow);

	// Sort by origin
	table.rows[0].cells[1].addEventListener("click", function () {
		sortTable(1);
	});

	// Sort by destination
	table.rows[0].cells[2].addEventListener("click", function () {
		sortTable(2);
	});

	// Sort by status
	table.rows[0].cells[5].addEventListener("click", function () {
		sortTable(5);
	});

	// Sort by paid
	table.rows[0].cells[6].addEventListener("click", function () {
		sortTable(6);
	});

	for (let i = 0; i < data.length; i++) {
		var dataStore = document.createElement("p");
		dataStore.hidden = true;
		dataStore.id = "dataStore" + i;
		dataStore.innerHTML = JSON.stringify(data[i].manifest.items);

		var divStore = document.getElementById("divStore");
		divStore.appendChild(dataStore);
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
		cell1.appendChild(document.createTextNode(data[i].vehicleID));
		cell2.appendChild(document.createTextNode(data[i].origin.oCompany));
		cell3.appendChild(document.createTextNode(data[i].destination.dCompany));

		var dConvertedDate = new Date(data[i].departureDate);
		var dDateString =
			((dConvertedDate.getMonth() + 1).toString().length > 1
				? dConvertedDate.getMonth() + 1
				: "0" + (dConvertedDate.getMonth() + 1)) +
			"/" +
			((dConvertedDate.getMonth() + 1).toString().length > 1
				? dConvertedDate.getDate()
				: "0" + dConvertedDate.getDate()) +
			"/" +
			dConvertedDate.getFullYear();

		cell4.appendChild(document.createTextNode(dDateString));

		var aConvertedDate = new Date(data[i].arrivalDate);
		var aDateString =
			((aConvertedDate.getMonth() + 1).toString().length > 1
				? aConvertedDate.getMonth() + 1
				: "0" + (aConvertedDate.getMonth() + 1)) +
			"/" +
			((aConvertedDate.getMonth() + 1).toString().length > 1
				? aConvertedDate.getDate()
				: "0" + aConvertedDate.getDate()) +
			"/" +
			aConvertedDate.getFullYear();

		cell5.appendChild(document.createTextNode(aDateString));
		if (data[i].arrivalStatus) {
			cell6.appendChild(document.createTextNode("Arrived"));
		} else {
			cell6.appendChild(document.createTextNode("In Process"));
		}
		if (data[i].payment) {
			cell7.appendChild(document.createTextNode("Yes"));
		} else {
			cell7.appendChild(document.createTextNode("No"));
		}
		var a = document.createElement("a");
		var text = document.createTextNode("[Click to Expand]");
		a.appendChild(text);
		a.href = "../../manifest.html";
		cell8.appendChild(a);

		row.appendChild(cell1);
		row.appendChild(cell2);
		row.appendChild(cell3);
		row.appendChild(cell4);
		row.appendChild(cell5);
		row.appendChild(cell6);
		row.appendChild(cell7);
		row.appendChild(cell8);

		table.appendChild(row);

		table.rows[i + 1].cells[7].getElementsByTagName(
			"a"
		)[0].onclick = function () {
			setSessionStorage(i);
			window.open(
				this.href,
				"Shipment Manifest",
				"width=500, height=500, left=100, top=100, scrollbars, resizable"
			);
			return false;
		};
	}
}

function outgoingShipmentTable(data) {
	// Get table and clear if it has data already
	var table = document.getElementById("reports");
	while (table.rows.length > 0) {
		table.deleteRow(0);
	}

	var pNodes = document.getElementsByTagName("p");
	for (let i = 0; i < pNodes.length; i++) {
		pNodes[i].parentNode.removeChild(pNodes[i]);
	}

	// Create header elements and initial header row
	var headerRow = document.createElement("tr");
	var origin = document.createElement("th");
	var destination = document.createElement("th");
	var vim = document.createElement("th");
	var depart = document.createElement("th");
	var arrive = document.createElement("th");
	var status = document.createElement("th");
	var payment = document.createElement("th");
	var manifest = document.createElement("th");

	// Populate header elements with text nodes
	vim.appendChild(document.createTextNode("Vehicle ID"));
	origin.appendChild(document.createTextNode("Origin"));
	destination.appendChild(document.createTextNode("Destination"));
	depart.appendChild(document.createTextNode("Departure Date"));
	arrive.appendChild(document.createTextNode("Arrival Date"));
	status.appendChild(document.createTextNode("Status"));
	payment.appendChild(document.createTextNode("Paid"));
	manifest.appendChild(document.createTextNode("Items"));

	// Append the header elements to the row element
	headerRow.appendChild(vim);
	headerRow.appendChild(origin);
	headerRow.appendChild(destination);
	headerRow.appendChild(depart);
	headerRow.appendChild(arrive);
	headerRow.appendChild(status);
	headerRow.appendChild(payment);
	headerRow.appendChild(manifest);

	// Append the row to the table
	table.appendChild(headerRow);

	// Sort by origin
	table.rows[0].cells[1].addEventListener("click", function () {
		sortTable(1);
	});

	// Sort by destination
	table.rows[0].cells[2].addEventListener("click", function () {
		sortTable(2);
	});

	// Sort by status
	table.rows[0].cells[5].addEventListener("click", function () {
		sortTable(5);
	});

	// Sort by paid
	table.rows[0].cells[6].addEventListener("click", function () {
		sortTable(6);
	});

	for (let i = 0; i < data.length; i++) {
		var dataStore = document.createElement("p");
		dataStore.hidden = true;
		dataStore.id = "dataStore" + i;
		dataStore.innerHTML = JSON.stringify(data[i].manifest.items);

		var divStore = document.getElementById("divStore");
		divStore.appendChild(dataStore);

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
		cell1.appendChild(document.createTextNode(data[i].vehicle.vehicleID));
		cell2.appendChild(document.createTextNode(data[i].origin.oCompany));
		cell3.appendChild(document.createTextNode(data[i].destination.dCompany));

		var dConvertedDate = new Date(data[i].departureDate);
		var dDateString =
			((dConvertedDate.getMonth() + 1).toString().length > 1
				? dConvertedDate.getMonth() + 1
				: "0" + (dConvertedDate.getMonth() + 1)) +
			"/" +
			((dConvertedDate.getMonth() + 1).toString().length > 1
				? dConvertedDate.getDate()
				: "0" + dConvertedDate.getDate()) +
			"/" +
			dConvertedDate.getFullYear();

		cell4.appendChild(document.createTextNode(dDateString));

		var aConvertedDate = new Date(data[i].arrivalDate);
		var aDateString =
			((aConvertedDate.getMonth() + 1).toString().length > 1
				? aConvertedDate.getMonth() + 1
				: "0" + (aConvertedDate.getMonth() + 1)) +
			"/" +
			((aConvertedDate.getMonth() + 1).toString().length > 1
				? aConvertedDate.getDate()
				: "0" + aConvertedDate.getDate()) +
			"/" +
			aConvertedDate.getFullYear();

		cell5.appendChild(document.createTextNode(aDateString));
		if (data[i].arrivalStatus) {
			cell6.appendChild(document.createTextNode("Arrived"));
		} else {
			cell6.appendChild(document.createTextNode("In Process"));
		}
		if (data[i].payment) {
			cell7.appendChild(document.createTextNode("Yes"));
		} else {
			cell7.appendChild(document.createTextNode("No"));
		}

		var a = document.createElement("a");
		var text = document.createTextNode("[Click to Expand]");
		a.appendChild(text);
		a.href = "../../manifest.html";
		cell8.appendChild(a);

		row.appendChild(cell1);
		row.appendChild(cell2);
		row.appendChild(cell3);
		row.appendChild(cell4);
		row.appendChild(cell5);
		row.appendChild(cell6);
		row.appendChild(cell7);
		row.appendChild(cell8);

		table.appendChild(row);

		table.rows[i + 1].cells[7].getElementsByTagName(
			"a"
		)[0].onclick = function () {
			setSessionStorage(i);
			window.open(
				this.href,
				"Shipment Manifest",
				"width=500, height=500, left=100, top=100, scrollbars, resizable"
			);
			return false;
		};
	}
}

function setSessionStorage(index) {
	sessionStorage.setItem(
		"objID",
		document.getElementById("dataStore" + index).innerHTML
	);
}

function sortTable(n) {
	var table,
		rows,
		switching,
		i,
		x,
		y,
		shouldSwitch,
		dir,
		switchcount = 0;
	table = document.getElementById("reports");
	switching = true;
	//Set the sorting direction to ascending:
	dir = "asc";
	/*Make a loop that will continue until
  no switching has been done:*/
	while (switching) {
		//start by saying: no switching is done:
		switching = false;
		rows = table.rows;
		/*Loop through all table rows (except the
    first, which contains table headers):*/
		for (i = 1; i < rows.length - 1; i++) {
			//start by saying there should be no switching:
			shouldSwitch = false;
			/*Get the two elements you want to compare,
      one from current row and one from the next:*/
			x = rows[i].getElementsByTagName("td")[n];
			y = rows[i + 1].getElementsByTagName("td")[n];
			/*check if the two rows should switch place,
      based on the direction, asc or desc:*/
			if (dir == "asc") {
				if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
					//if so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			} else if (dir == "desc") {
				if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
					//if so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			/*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			//Each time a switch is done, increase this count by 1:
			switchcount++;
		} else {
			/*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
}
