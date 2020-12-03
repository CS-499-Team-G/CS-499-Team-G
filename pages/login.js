function login() {
	var req = new XMLHttpRequest();
	req.open(
		"POST",
		"http://68.93.20.191:5000/users/login",
		false,
		document.getElementById("username").value,
		document.getElementById("password").value
	);
	req.send(null);

	if (req.responseText === "Valid") {
		window.location.href = "reports.html";
	} else {
		alert("Invalid login attempt");
	}
}
