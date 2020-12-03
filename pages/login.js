function login(user, pass) {
	var req = new XMLHttpRequest();
	req.open("POST", "http://68.93.20.191:5000/users/login", false);
	var data = JSON.parse(
		'{ "username": "' + user + '", "password": "' + pass + '" }'
	);
	req.send(data);

	console.log(req.body);

	if (req.responseText === "Valid") {
		window.location.href = "reports.html";
	} else {
		alert("Invalid login attempt");
	}
}
