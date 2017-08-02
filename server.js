
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

      for(var j = i; j <= i + 3; j++){

        storePlayerValues.push(playerValuesArr[j]);
      }

      //FirstName, LastName, Team, Best, Worst, Avg, StdDev
      var createdPlayer = new Player(
        splitPlayerNameArr[0],
        splitPlayerNameArr[1],
        splitPlayerNameArr[2],
        storePlayerValues[0],
        storePlayerValues[1],
        storePlayerValues[2],
        storePlayerValues[3]
      );

      playerArr.push(createdPlayer);

      console.log(createdPlayer);

    }

  });

  res.json({message: 'quarterback values'});
})





// Express App Initialization
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
