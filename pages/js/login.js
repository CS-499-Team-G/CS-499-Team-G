// login.js
function login() {
	sessionStorage.setItem("AuthenticationState", "Authenticated");

	sessionStorage.setItem("AuthenticationExpires", Date.now.addHours(1));

	window.location.href = "../reports.html";
}
