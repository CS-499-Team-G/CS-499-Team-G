// login.js
function login() {
	username = $("#username").val();
	password = $("#password").val();

	sessionStorage.setItem("AuthenticationState", "Authenticated");

	sessionStorage.setItem("AuthenticationExpires", Date.now.addHours(1));

	location.href = "reports.html";
}
