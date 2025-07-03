const express = require('express');
const submit = require('./routes/submit');
const track = require('./routes/track');
const prepareUpload = require('./routes/prepare-upload');

const app = express();
app.use(express.json());

app.use("/submit", submit);
app.use("/track", track);
app.use('/prepare-upload', prepareUpload);
app.get("/", (req, res) => {
  res.send("Server is live!");
});


module.exports = app;