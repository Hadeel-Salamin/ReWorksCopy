const path = require('path');
const express = require('express');

const app = express();
require('env2')('config.env');

const router = require('./router');

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
module.exports = app;
