const express = require('express');
var httprequest = require('request');

var router = express.Router();

var createPlayerObjects = require('../functions/createPlayerObjects');
var createOrUpdateDocument = require('../functions/createOrUpdateDocument');

var db = require('../config/firebaseconfig');

var createPlayerValueGraphcool = require('../functions/createPlayerValueGraphcool');

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging    
    console.log('Middleware is working!.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to the USFL api!' });
});

// routes for obtaining player values and saving player values to the DB for Quarter Backs
router.route('/playervalues/qb')
.get(function(req, res){
  httprequest('https://www.fantasypros.com/nfl/rankings/dynasty-qb.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var qbs = createPlayerObjects(body, "qb");
    res.json(qbs);
  });
})
.post(function (req, res) {
  httprequest('https://www.fantasypros.com/nfl/rankings/dynasty-qb.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var qbs = createPlayerObjects(body, "qb");  
    var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');  

    createPlayerValueGraphcool(qbs, "QB", 35);
    res.json(qbs);
  });
});

// obtaining player values and saving player vales to the DB for Running Backs

router.route('/playervalues/rb')
.get(function(req, res){
  httprequest('https://www.fantasypros.com/nfl/rankings/dynasty-rb.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var rbs = createPlayerObjects(body, "rb");
    res.json(rbs);
  });
})
.post(function (req, res) {
  httprequest('https://www.fantasypros.com/nfl/rankings/dynasty-rb.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var rbs = createPlayerObjects(body, "rb");  
    var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');  

    createPlayerValueGraphcool(rbs, "RB", 50);
    res.json(rbs);
  });
});

// obtaining player values and saving player vales to the DB for Wide Recievers

router.route('/playervalues/wr')
.get(function(req, res){
  httprequest('https://www.fantasypros.com/nfl/rankings/dynasty-wr.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var wrs = createPlayerObjects(body, "wr");
    res.json(wrs);
  });
})
.post(function (req, res) {
  httprequest('https://www.fantasypros.com/nfl/rankings/dynasty-wr.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var wrs = createPlayerObjects(body, "wr");  
    var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');  

    createPlayerValueGraphcool(wrs, "WR", 75);
    res.json(wrs);
  });
});

// obtaining player values and saving player vales to the DB for Tight Ends

router.route('/playervalues/te')
.get(function(req, res){
  httprequest('https://www.fantasypros.com/nfl/rankings/dynasty-te.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var tes = createPlayerObjects(body, "te");
    res.json(tes);
  });
})
.post(function (req, res) {
  httprequest('https://www.fantasypros.com/nfl/rankings/dynasty-te.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var tes = createPlayerObjects(body, "te");    

    createPlayerValueGraphcool(tes, "TE", 35);
    res.json(tes);
  });
});


module.exports = router;