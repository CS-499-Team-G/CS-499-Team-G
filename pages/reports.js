function reportDecision() {
	if (document.getElementById("selection").value === "3") {
		shipmentTable();
	}
}

function shipmentTable() {
	var table = document.getElementById("reports");

	var headerRow = document.createElement("tr");
	var traffic = document.createElement("th");
	var company = document.createElement("th");
	var address = document.createElement("th");
	var vim = document.createElement("th");
	var depart = document.createElement("th");
	var arrive = document.createElement("th");
	var status = document.createElement("th");

	traffic.appendChild(document.createTextNode("Traffic"));
	company.appendChild(document.createTextNode("Company"));
	address.appendChild(document.createTextNode("Address"));
	vim.appendChild(document.createTextNode("Vehicle ID"));
	depart.appendChild(document.createTextNode("Departure Date"));
	arrive.appendChild(document.createTextNode("Arrival Date"));
	status.appendChild(document.createTextNode("Status"));

	headerRow.appendChild(traffic);
	headerRow.appendChild(company);
	headerRow.appendChild(address);
	headerRow.appendChild(vim);
	headerRow.appendChild(depart);
	headerRow.appendChild(arrive);
	headerRow.appendChild(status);
	table.appendChild(headerRow);
}

function fetchData() {
	fetch("http:localhost:5000/users/login")
		.then((response) => {
			console.log(response.body);
			if (!response.ok) {
				throw Error("ERROR");
			}
			return response.json();
		})
		.then((data) => {
			console.log(data.data);
			const html = data.data.map((user) => {
				return `<p>Name: ${user.userName}</p>`;
			});
		})
		.catch((error) => {
			console.log(error);
		});
}
function msg() {
	alert("Request: " + response.body);
}

msg();
