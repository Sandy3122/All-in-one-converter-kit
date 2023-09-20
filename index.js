const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const port = 3000;
const cors = require('cors');

// Enable CORS for all routes
const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));


app.use(express.static('public'));

// Serve the index.html as the landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/main.html'));
});

const imgToPdfRoutes = require('./public/imgToPdf/routers/routers')

app.use('/imgToPdf', imgToPdfRoutes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});