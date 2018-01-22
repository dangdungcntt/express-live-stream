const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const homeRouter = require('./routers/home.js');

app.use('/', homeRouter);

app.listen(8000);