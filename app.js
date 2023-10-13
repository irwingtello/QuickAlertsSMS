require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // You can change the port number to your preference

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define a route for handling POST requests
app.post('/api/quickalerts', (req, res) => {
  // Handle the POST request here
  const requestData = req.body; // This will contain the JSON data from the POST request

const client = require('twilio')(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

client.messages
    .create({
      body: process.env.MESSAGE + requestData.length,
      from: process.env.FROM,
      to:  process.env.TO
    })
   // .then(message => console.log(message.sid))
   .then(message => {console.log(message.sid)})
    .done();
  // You can process the data and send a response
  res.status(200).json({ message: 'POST request received successfully', data: requestData });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
