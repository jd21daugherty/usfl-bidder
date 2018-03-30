
const express = require('express');
var bodyParser = require('body-parser');

var cors = require('cors');
var corsOptions = require('./app/config/cors-config');

var Player = require('./app/models/player.js');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.listen(process.env.PORT || 5000);


app.use(cors(corsOptions));

var playerValuesControler = require('./app/controllers/playervalues-controller');
app.use('/api', playerValuesControler);






