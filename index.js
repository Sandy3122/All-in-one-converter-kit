const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const port = 3000;
const multer = require('multer');

app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads'; // Store files in the 'uploads' directory
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.replace(/\s/g, '_');
        cb(null, filename);
    }
});

const upload = multer({ storage });

// Import imgToPdf controller
const imgToPdfController = require('./public/imgToPdf/controllers/imgToPdfController');

// Serve the index.html as the landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/main.html'));
});
app.get('/imgToPdf', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/imgToPdf/index.html'));
});

// Define routes for imgToPdf functionality
app.post('/imgToPdf/convert', upload.array('images'), imgToPdfController.convert);
app.get('/imgToPdf/download/:filename', imgToPdfController.download);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
