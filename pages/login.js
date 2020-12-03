function login() {
	var req = new XMLHttpRequest();
	req.open("POST", "http://68.93.20.191:5000/users/login", false);
	req.send(
		"username=" +
			document.getElementById("username").value +
			"&password=" +
			document.getElementById("password").value
	);

	if (req.responseText === "Valid") {
		window.location.href = "reports.html";
	} else {
		alert("Invalid login attempt");
	}
}
