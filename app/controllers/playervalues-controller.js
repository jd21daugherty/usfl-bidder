const express = require('express');
var request = require('request');

var router = express.Router();

var createPlayerObjects = require('../functions/createPlayerObjects');
var createOrUpdateDocument = require('../functions/createOrUpdateDocument');

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
  request('https://www.fantasypros.com/nfl/rankings/dynasty-qb.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var qbs = createPlayerObjects(body, "qb");
    res.json(qbs);
  });
})
.post(function (req, res) {
  request('https://www.fantasypros.com/nfl/rankings/dynasty-qb.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var qbs = createPlayerObjects(body, "qb");  
    var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');  

    //save only the top 25 qbs
    for(var i = 0; i < 24; i++){
      var qbDocRef = db.collection('qb-values').doc(qbs[i].FirstName + " " + qbs[i].LastName);
      var timevalue = {
        timestamp: date,
        value: qbs[i].Value,
        best: qbs[i].Best,
        worst: qbs[i].Worst,
        avg: qbs[i].Avg,
        stddev: qbs[i].StdDev,
        divisor: qbs[i].Divisor,    
      }
      
      createOrUpdateDocument(qbDocRef, qbs[i].FirstName, qbs[i].LastName, qbs[i].Team, timevalue);

    };
    res.json(qbs);
  });
});

// obtaining player values and saving player vales to the DB for Running Backs

router.route('/playervalues/rb')
.get(function(req, res){
  request('https://www.fantasypros.com/nfl/rankings/dynasty-rb.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var rbs = createPlayerObjects(body, "rb");
    res.json(rbs);
  });
})
.post(function (req, res) {
  request('https://www.fantasypros.com/nfl/rankings/dynasty-rb.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var rbs = createPlayerObjects(body, "rb");  
    var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');  

    //save only the top 50 rbs
    for(var i = 0; i < 49; i++){
      var rbDocRef = db.collection('rb-values').doc(rbs[i].FirstName + " " + rbs[i].LastName);
      var timevalue = {
        timestamp: date,
        value: rbs[i].Value,
        best: rbs[i].Best,
        worst: rbs[i].Worst,
        avg: rbs[i].Avg,
        stddev: rbs[i].StdDev,
        divisor: rbs[i].Divisor,    
      }
      
      createOrUpdateDocument(rbDocRef, rbs[i].FirstName, rbs[i].LastName, rbs[i].Team, timevalue);

    };
    res.json(rbs);
  });
});

// obtaining player values and saving player vales to the DB for Wide Recievers

router.route('/playervalues/wr')
.get(function(req, res){
  request('https://www.fantasypros.com/nfl/rankings/dynasty-wr.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var wrs = createPlayerObjects(body, "wr");
    res.json(wrs);
  });
})
.post(function (req, res) {
  request('https://www.fantasypros.com/nfl/rankings/dynasty-wr.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var wrs = createPlayerObjects(body, "wr");  
    var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');  

    //save only the top 75 wrs
    for(var i = 0; i < 74; i++){
      var wrDocRef = db.collection('wr-values').doc(wrs[i].FirstName + " " + wrs[i].LastName);
      var timevalue = {
        timestamp: date,
        value: wrs[i].Value,
        best: wrs[i].Best,
        worst: wrs[i].Worst,
        avg: wrs[i].Avg,
        stddev: wrs[i].StdDev,
        divisor: wrs[i].Divisor,    
      }
      
      createOrUpdateDocument(wrDocRef, wrs[i].FirstName, wrs[i].LastName, wrs[i].Team, timevalue);

    };
    res.json(wrs);
  });
});

// obtaining player values and saving player vales to the DB for Tight Ends

router.route('/playervalues/te')
.get(function(req, res){
  request('https://www.fantasypros.com/nfl/rankings/dynasty-te.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var tes = createPlayerObjects(body, "te");
    res.json(tes);
  });
})
.post(function (req, res) {
  request('https://www.fantasypros.com/nfl/rankings/dynasty-te.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var tes = createPlayerObjects(body, "te");  
    var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');  

    //save only the top 25 tes
    for(var i = 0; i < 24; i++){
      var teDocRef = db.collection('te-values').doc(tes[i].FirstName + " " + tes[i].LastName);
      var timevalue = {
        timestamp: date,
        value: tes[i].Value,
        best: tes[i].Best,
        worst: tes[i].Worst,
        avg: tes[i].Avg,
        stddev: tes[i].StdDev,
        divisor: tes[i].Divisor,    
      }
      
      createOrUpdateDocument(teDocRef, tes[i].FirstName, tes[i].LastName, tes[i].Team, timevalue);

    };
    res.json(tes);
  });
});



module.exports = router;