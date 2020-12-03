function shipmentTable() {
	var headerRow = document.createElement("TR");
	var traffic = document.createElement("TH");
	traffic.innerHTML("TEST");

	document.getElementById("reports").appendChild(headerRow);
	document.getElementById("reports").tr.appendChild(traffic);
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
shipmentTable();
