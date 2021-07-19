const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//this is a test route for upload
router.post('/upload', upload.single('filename'), (req, res) => {
  res.json({ file: req.file });
})

module.exports = router