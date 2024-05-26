// first Read a README.md file

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const Bucket = require('./models/bucket');
const File = require('./models/file');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/file-bucket-service', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware
app.use(express.json());

// Multer used for storing a files.
// also create a uploads folder before run
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const bucketPath = path.join(__dirname, 'uploads', req.body.bucketId);
        console.log(req.body.bucketId);
        if (!fs.existsSync(bucketPath)) {
            fs.mkdirSync(bucketPath, { recursive: true });
        }
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });


app.get('/buckets', async (req, res) => {
    const buckets = await Bucket.find();
    res.json(buckets);
});

app.post('/buckets', async (req, res) => {
    const bucket = new Bucket(req.body);
    await bucket.save();
    res.json(bucket);
});


// for :id used a only _id
app.get('/buckets/:id', async (req, res) => {

    const bucket = await Bucket.findById(req.params.id);
    res.json(bucket);
    console.log(bucket);

});

// for :id we used a bucketID
app.get('/buckets/:id/files', async (req, res) => {
    const files = await File.find({ bucketId: req.params.id });
    res.json(files);
});

// for :id used a only _id
app.delete('/buckets/:id', async (req, res) => {
    await Bucket.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

///////////////////////////////////////////////////////

// first eirte in a body is buckeID key and value then file key used and attached a file.
// please select file once at a time not a double
app.post('/files', upload.single('file'), async (req, res) => {

    try {
        const { bucketId } = req.body;
        const file = new File({
            filename: req.file.filename,
            url: req.file.path,
            bucketId,
        });

        await file.save();
        // console.log(file);
        res.json(file);

    } catch (error) {
        console.error('Error while uploading file:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});


// for :id used a only _id
app.get('/files/:id', async (req, res) => {
    const file = await File.findById(req.params.id);
    if (file) {
        res.sendFile(path.resolve(file.url));
    } else {
        res.status(404).send('File not found');
    }
});


// for :bucketId used a only bucketId
app.get('/files/bucket/:bucketId', async (req, res) => {
    const files = await File.find({ bucketId: req.params.bucketId });
    res.json(files);
});

// for :id used a only _id
app.delete('/files/:id', async (req, res) => {
    await File.findByIdAndDelete(req.params.id);
    res.status(204).send();
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


// we used these Dependence annd Node.js
// "express": "^4.19.2",
// "mongoose": "^8.4.0",
// "multer": "^1.4.5-lts.1",
