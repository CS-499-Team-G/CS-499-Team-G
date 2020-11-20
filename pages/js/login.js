// login.js

Date.prototype.addHours = function (h) {
	this.setTime(this.getTime() + h * 60 * 60 * 1000);
	return this;
};

function login() {
	sessionStorage.setItem("AuthenticationState", "Authenticated");

	sessionStorage.setItem("AuthenticationExpires", Date.now().addHours(1));

	window.location.href = "pages/reports.html";
}
