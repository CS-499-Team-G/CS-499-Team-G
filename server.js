const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // This will let us analyze the body of a JSON request
app.use(express.urlencoded({ extended: false })); // This will let us analyze the body of any other type of request

app.use(express.static(path.join(__dirname, "pages")));

// Gives access to the data models
const usersRouter = require("./middleware/routes/users"); // .require() lets us use the api calls in the Users.js
app.use("/users", usersRouter); // Use the instance of Users that we just created

const shipmentsRouter = require("./middleware/routes/shipments"); // .require() lets us use the api calls in the Users.js
app.use("/shipments", shipmentsRouter); // Use the instance of Users that we just created

const vehiclesRouter = require("./middleware/routes/vehicles"); // .require() lets us use the api calls in the Users.js
app.use("/vehicles", vehiclesRouter); // Use the instance of Users that we just created


// Use the connection code in the .env file to create a connection to mongoDB database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

// When the connection opens, do something
const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB database connection established successfully");
});

/* Get requests are used to get information from the server. 
   Once we receive a request, we will send information back.
*/

// API Call: http:localhost5000/
app.get("/", (req, res) =>
	/* Server.js lives in the root directory. _dirname is an 
       environment var that returns the current working dir.
    */
	res.sendFile(path.resolve(__dirname, "home.html"))
);

// API Call: http:localhost5000/pages/sign-up.html
app.get("/pages/sign-up.html", (req, res) =>
	res.sendFile(path.resolve(__dirname, "pages", "sign-up.html"))
);
/*
app.get("*", function (req, res) {
	res.send("Error 404: Page not found", 404);
});
*/
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
