const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // This will let us analyze the body of a request

require('dotenv').config();

// Gives access to the data models
const usersRouter = require('./routes/users'); // .require() lets us use the api calls in the Users.js
app.use('/users', usersRouter); // Use the instance of Users that we just created

const shipmentsRouter = require('./routes/shipments'); // .require() lets us use the api calls in the Users.js
app.use('/shipments', shipmentsRouter); // Use the instance of Users that we just created

// Use the connection code in the .env file to create a connection to mongoDB database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

// When the connection opens, do something
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})



/* Get requests are used to get information from the server. 
   Once we receive a request, we will send information back.
*/
app.get('*', (req, res) =>
    res.sendFile('home.html')
);

app.listen(PORT, () => 
    console.log(`Server started on port ${PORT}`)
);