const db = require('../../config/keys').mongoURI
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//attaching files to mongo
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const path = require('path')
const crypto = require('crypto')

// Init gfs
let gfs;
mongoose.connection.once('open', () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo)
  gfs.collection('icons')
})

// Create storage engine
const storage = new GridFsStorage({
  url: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'icons'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

//get all files
router.get('/', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if(!files || files.length === 0){
      return res.status(404).json({
        err: 'No files yet'
      });
    }
    return res.json(files)
  })
})

//get one file
router.get('/:filename', (req, res) => {
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    if(!file || file.length === 0){
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    return res.json(file);
  })
})

//get image
router.get('/image/:filename', (req, res) => {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    if(!file || file.length === 0){
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    if(file.contentType === 'image/jpeg' || file.contentType === 'image/png'){
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res)
    } else{
        res.status(404).json({
            err: "Not an image"
        })
    }
  })
})

//upload file
router.post('/', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
})

module.exports = router