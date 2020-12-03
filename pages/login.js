// login.js
function login() {
	var req = new XMLHttpRequest();
	req.open("POST", "http://68.93.20.191:5000/users/login", false);
	req.send(null);

	console.log(req.responseText);

	sessionStorage.setItem("AuthenticationState", "Authenticated");

	sessionStorage.setItem("AuthenticationExpires", Date.now() + 60 * 60 * 1000);

	window.location.href = "reports.html";
}
