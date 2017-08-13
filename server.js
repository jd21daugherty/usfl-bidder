
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
    console.log('Middleware is working!.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to the USFL api!' });
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
    var rbs = createPlayerObjects(body, "rb");
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
    var tes = createPlayerObjects(body, "te");
    res.json(tes);
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
