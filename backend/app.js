const express = require('express');
const cors = require('cors');
const submit = require('./routes/submit');
const track = require('./routes/track');
const prepareUpload = require('./routes/prepare-upload');
const org = require('./routes/org');

const app = express();

app.use(cors({
  origin:  'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type','x-amz-server-side-encryption', 'x-amz-server-side-encryption-aws-kms-key-id'],
  credentials: true
}));

app.use(express.json());

app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,x-amz-server-side-encryption,x-amz-server-side-encryption-aws-kms-key-id");
  res.sendStatus(200);
});

app.use("/submit", submit);
app.use("/track", track);
app.use('/prepare-upload', prepareUpload);
app.use("/org", org);

module.exports = app;