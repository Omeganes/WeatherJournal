// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening()
{
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}

// get route
app.get('/alldata', function (req, res) {
    console.log(projectData);
    res.send(projectData);
});


// post route
app.post('/add',function(req, res){
    let newData = req.body;
    let newEntry = {
        temperature: newData.Temperature,
        date: newData.date,
        userResponse: newData.userResponse
    };
    projectData.push(newEntry);
});