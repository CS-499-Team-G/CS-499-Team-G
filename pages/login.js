// login.js
function login() {
	sessionStorage.setItem("AuthenticationState", "Authenticated");

	sessionStorage.setItem("AuthenticationExpires", Date.now() + 60 * 60 * 1000);

	window.location.href = "pages/reports.html";
}
