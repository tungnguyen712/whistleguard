const express = require('express');
const submit = require('./routes/submit');

const app = express();
app.use(express.json());

app.use("/submit", submit);

module.exports = app;