// imgToPdf/routers.js
const express = require('express');
const router = express.Router();
const imgToPdfController = require('../controllers/imgToPdfController.js');

// Define the /convert route
router.post('/convert', imgToPdfController.convert);

// Define the /download route
router.get('/download/:filename', imgToPdfController.download);

module.exports = router;
