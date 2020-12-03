function shipmentTable() {
	var table = document.getElementById("reports");

	var headerRow = document.createElement("tr");
	var traffic = document.createElement("th");
	traffic.appendChild(document.createTextNode("Test"));

	headerRow.appendChild(traffic);
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
