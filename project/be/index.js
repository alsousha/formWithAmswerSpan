const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

app.post('/submit-data', (req, res) => {
    console.log('Received data:', req.body); // Accessing data from request body
    // Here you can perform any processing on the received data
    res.send('Data received successfully!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
