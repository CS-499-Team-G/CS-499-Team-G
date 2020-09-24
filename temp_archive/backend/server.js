const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5005;
const mongoose = require('mongoose');
require('dotenv').config();

// gives access to the data models
const usersRouter = require('./routes/users');
app.use('./users', usersRouter);
app.use(express.json());


app.use(cors());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})



/* Get requests are used to get information from the server. Once 
   Once we receive a request, we will send information back*/
app.get('/', (req, res) =>
    res.send('API RUNNING')
);

app.listen(PORT, () => 
    console.log(`Server started on port ${PORT}`)
);