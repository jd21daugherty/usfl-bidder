
const express = require('express');
const cheerio = require('cheerio');
var bodyParser = require('body-parser');
var request = require('request');

var Player = require('./app/models/player.js');

var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// routes for obtaining player values
router.route('/playervalues/qb')
.get(function(req, res){

  request('https://www.fantasypros.com/nfl/rankings/dynasty-qb.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var qbs = createPlayerObjects(body, "qb");
    res.json(qbs);
  });
});

router.route('/playervalues/rb')
.get(function(req, res){
  request('https://www.fantasypros.com/nfl/rankings/dynasty-rb.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var rbs = createPlayerObjects(body);
    res.json(rbs);
  });
});

router.route('/playervalues/wr')
.get(function(req, res){

  request('https://www.fantasypros.com/nfl/rankings/dynasty-wr.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var wrs = createPlayerObjects(body, "wr");
    res.json(wrs);
  });
});

router.route('/playervalues/te')
.get(function(req, res){

  request('https://www.fantasypros.com/nfl/rankings/dynasty-te.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var tes = createPlayerObjects(body);
    res.json(tes);
  });
});

router.route('/playervalues/k')
.get(function(req, res){

  request('https://www.fantasypros.com/nfl/rankings/dynasty-k.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var k = createPlayerObjects(body);
    res.json(k);
  });
});

router.route('/playervalues/dst')
.get(function(req, res){

  request('https://www.fantasypros.com/nfl/rankings/dynasty-dst.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var dst = createPlayerObjects(body);
    res.json(dst);
  });
});

router.route('/playervalues/overall')
.get(function(req, res){

  request('https://www.fantasypros.com/nfl/rankings/dynasty-overall.php', function(error, response, body){
    console.log('Errors: ' + error);
    // call out to return from create player objects function
    var overall = createPlayerObjects(body);
    res.json(overall);
  });
});

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
      playerValuesArr.splice(i,1);
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

    if (position = "qb"){
      divisor = getQbDivisor(avgRank);
    }
    else if (position = "rb"){

    }
    else if (position = "wr"){
      divisor = getWrDivisor(avgRank);
    }
    else if (position = "te"){

    }
    else if (position = "k"){

    }
    else if (position = "dst"){

    }

    var value = calculatePlayerValue(divisor, storePlayerValues[1]);

    //FirstName, LastName, Team, Best, Worst, Avg, StdDev, divisor, value
    var createdPlayer = new Player(
      splitPlayerNameArr[0],
      splitPlayerNameArr[1],
      splitPlayerNameArr[2],
      storePlayerValues[0],
      storePlayerValues[1],
      storePlayerValues[2],
      storePlayerValues[3],
      divisor,
      value
    );

    playerArr.push(createdPlayer);

    console.log(createdPlayer);

   }
    return playerArr;
  }

function calculatePlayerValue(divisor, worstRank){
  return playerValue = Math.floor(((100 - worstRank) * 2) / divisor);
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

function getWrDivisor(avgRank){
  var divisor = 0;
  if (avgRank <= 20){
    divisor = divisor + 4
  }
  else if (avgRank > 20 && avgRank <= 40){
    divisor = divisor + 4.05
  }
  else if (avgRank > 40 && avgRank <= 60) {
    divisor = divisor + 4.1
  }
  else if (avgRank > 60 && avgRank <= 75){
    divisor = divisor + 4.25
  }
  else if (avgRank > 75 && avgRank <= 100){
    divisor = divisor + 4.35
  }
  else {
    divisor = divisor + 4.5
  }

  return divisor;
}


// Express App Initialization
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
