const cheerio = require('cheerio');
var Player = require('../models/player');
var getQbDivisor = require('./calculateDivisors/getQbDivisor');
var getRbDivisor = require('./calculateDivisors/getRbDivisor');
var getWrDivisor = require('./calculateDivisors/getWrDivisor');
var getTeDivisor = require('./calculateDivisors/getTeDivisor');
var calculatePlayerValue = require('./calculatePlayerValue');

module.exports = function createPlayerObjects(body, position){

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
      var lastName = splitPlayerNameArr[2];
      var team = splitPlayerNameArr[3];
  
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
