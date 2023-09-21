const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv')

// To access the .env 
dotenv.config();

// Enable CORS for all routes
const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Serve the index.html as the landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/main.html'));
});

// Add a route for testing file uploads
app.post('/test-upload', upload.array('images'), (req, res) => {
    // Respond with a success message
    res.json({ message: 'File uploaded successfully' });
});


const imgToPdfRoutes = require('./public/imgToPdf/routers/routers')

app.use('/public/imgToPdf', imgToPdfRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});