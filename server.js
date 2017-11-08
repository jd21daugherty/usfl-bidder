
const express = require('express');
const cheerio = require('cheerio');
var bodyParser = require('body-parser');
var request = require('request');
var cors = require('cors');

var Player = require('./app/models/player.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

var admin = require("firebase-admin");

var serviceAccount = require("./sa.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://usfl-dynasty-values.firebaseio.com"
});

var db = admin.firestore();

var corsOptions = {
  origin: 'https://birdwell.github.io/fantasy-values/',
  optionsSuccessStatus: 200
};

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging    

    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', cors(corsOptions), function(req, res) {
    res.json({ message: 'hooray! welcome to the USFL api!' });
});

// routes for obtaining player values and saving player values to the DB for Quarter Backs
router.route('/playervalues/qb')
.get( cors(), function(req, res){
  //res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
.get( cors(corsOptions), function(req, res){
  request('https://www.fantasypros.com/nfl/rankings/dynasty-rb.php', function(error, response, body){
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
.get( cors(corsOptions), function(req, res){
  request('https://www.fantasypros.com/nfl/rankings/dynasty-wr.php', function(error, response, body){
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
.get( cors(corsOptions), function(req, res){
  //res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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

// API Private Functions

async function createOrUpdateDocument(docRef, playerfirstname, playerlastname, team, timevalue) {
  var getDoc = await docRef.get()
  .then(doc => {
      if (!doc.exists) {
          //console.log('Creating document for : ' + playerfirstname + " " + playerlastname );
          docRef.set({
            firstname: playerfirstname,
            lastname: playerlastname,
            team: team,
            values: [timevalue]
          });
      } else {
          //console.log('Updating document for :' + playerfirstname + " " + playerlastname);
          var newValueArr = doc.data().values;
          newValueArr.push(timevalue);
          docRef.update({
            values: newValueArr
          });
      }
  })
  .catch(err => {
      console.log('Error getting document', err);
  });
}

function createPlayerObjects(body, position){

  const $ = cheerio.load(body.toString());

  var playerNamesArr = [];

  var playerNames = $('.player-label').each(function(i, element){
    playerNamesArr[i] = $(this).text();
  });
  playerNamesArr.join(', ');
  // clean up player names array data
  playerNamesArr.splice(0,2);
  //console.log(playerNamesArr);

  var playerValuesArr = [];

  var playerValues = $('.view-options').each(function(i, element){
    playerValuesArr[i] = $(this).text();
  });
  playerValuesArr.join(', ');
  // clean up player values array data
  playerValuesArr.splice(0,5);

  for(var i = 4; i < playerValuesArr.length ; i = i + 4){
      playerValuesArr.splice(i,0);
  }
  //console.log(playerValuesArr);

  // create a new player object for each player and push it to a player array
  const playerArr = [];

  for(var i = 0; i < playerNamesArr.length; i++){

    var splitPlayerNameArr = [];
    splitPlayerNameArr = playerNamesArr[i].split(' ');

    var storePlayerValues = [];

    // the counter starts at i * 4, b/c for each player you take
    // four values from the player values array

    for(var j = (i * 4); j <= (i * 4) + 3; j++){
      storePlayerValues.push(playerValuesArr[j]);
    }

    var divisor;

    var avgRank = storePlayerValues[2];

    if (position === "qb"){
      divisor = getQbDivisor(avgRank);
    }
    else if (position === "rb"){
      divisor = getRbDivisor(avgRank);
    }
    else if (position === "wr"){
      divisor = getWrDivisor(avgRank);
    }
    else if (position === "te"){
      divisor = getTeDivisor(avgRank);
    }


    var firstName = splitPlayerNameArr[0];
    var lastName = splitPlayerNameArr[1];
    var team = splitPlayerNameArr[2];

    var bestRank = storePlayerValues[0];
    var worstRank = storePlayerValues[1];

    var stdDev = storePlayerValues[3];

    var value = calculatePlayerValue(divisor, bestRank, worstRank);

    //FirstName, LastName, Team, Best, Worst, Avg, StdDev, divisor, value
    var createdPlayer = new Player(
      firstName,
      lastName,
      team,
      bestRank,
      worstRank,
      avgRank,
      stdDev,
      divisor,
      value
    );

    playerArr.push(createdPlayer);

    //console.log(createdPlayer);

   }
    return playerArr;
  }

function calculatePlayerValue(divisor, bestRank, worstRank){
  return playerValue = Math.floor(((100 - bestRank) + (100 - worstRank)) / divisor);
}

function getQbDivisor(avgRank){
  var divisor = 0;
  if (avgRank <= 5){
    divisor = divisor + 4
  }
  else if (avgRank > 5 && avgRank <= 10){
    divisor = divisor + 5
  }
  else if (avgRank > 10 && avgRank <= 20) {
    divisor = divisor + 6
  }
  else {
    divisor = divisor + 7
  }

  return divisor;
}

function getRbDivisor(avgRank){
  var divisor = 0;
  if (avgRank <= 10){
    divisor = divisor + 4
  }
  else if(avgRank > 10 && avgRank <= 20){
    divisor = divisor + 4.5
  }
  else if(avgRank > 20 && avgRank <= 25){
    divisor = divisor + 5
  }
  else if(avgRank > 25 && avgRank <= 40){
    divisor = divisor + 5.5
  }
  else{
    divisor = divisor + 6
  }
  return divisor;
}

function getWrDivisor(avgRank){
  var divisor = 0;
  if (avgRank <= 15){
    divisor = divisor + 4
  }
  else if (avgRank > 15 && avgRank <= 30){
    divisor = divisor + 4.5
  }
  else if (avgRank > 30 && avgRank <= 50) {
    divisor = divisor + 4.75
  }
  else if (avgRank > 50 && avgRank <= 75){
    divisor = divisor + 5
  }
  else if (avgRank > 75 && avgRank <= 100){
    divisor = divisor + 5.25
  }
  else {
    divisor = divisor + 5.5
  }

  return divisor;
}

function getTeDivisor(avgRank){
  var divisor = 0;
  if (avgRank <= 2){
    divisor = divisor + 4
  }
  else if(avgRank > 2 && avgRank <= 5){
    divisor = divisor + 4.5
  }
  else if(avgRank > 5 && avgRank <= 10){
    divisor = divisor + 5
  }
  else{
    divisor = divisor + 6
  }
  return divisor;
}

// Express App Initialization
app.use('/api', router);

app.listen(port);
console.log('Welcome to the USFL API on port: ' + port);
