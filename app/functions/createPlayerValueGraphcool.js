var graphqlConfigObject = require('../config/graphcool-config');
var graphqlEndpoint = graphqlConfigObject.url;

const { request } = require('graphql-request');

var createNewPlayerMutation = require('../graphql-queries/createNewPlayerMutation');
var createNewPlayerValueAndReturnId = require('../graphql-queries/createNewPlayerValueAndReturnId');
var addToPlayerPlayerValue = require('../graphql-queries/addToPlayerPlayerValue');

var connectPlayerValueAndPlayerByIds = require('../functions/connectPlayerValueAndPlayerByIds');
var createPlayerValue = require('../functions/createPlayerValue');
var getAllPlayersForPosition = require('../functions/getAllPlayersForPosition');
var createNewPlayer = require('../functions/createNewPlayer');

const createPlayerValueGraphcool = async (playersArr, position, numberOfPlayersToSave) => {

    // go get the player objects from graphql
    var graphcoolPlayers = []; 

    var positionVariable = {
      position: position
    }  

      graphcoolPlayers = await getAllPlayersForPosition(positionVariable);

      // Save a configurable number of players
      for(var i = 0; i < numberOfPlayersToSave; i++){

        var playerFullName = playersArr[i].FirstName + " " + playersArr[i].LastName;

        var matchingPlayerArr = graphcoolPlayers.filter(graphcoolPlayer => {
          return graphcoolPlayer.firstName + " " + graphcoolPlayer.lastName === playerFullName;
        });

        // there is no matching player in the graphcool db, create a player and save the player value
        if(matchingPlayerArr.length === 0){         
          console.log("No matching record for " + playerFullName)

          var createPlayerVariable = {
            firstName: playersArr[i].FirstName,
            lastName: playersArr[i].LastName,
            position: position,
            realTeam: playersArr[i].Team
          }

            var createdPlayerId = await createNewPlayer(createPlayerVariable);

            var bestIntConverted = parseInt(playersArr[i].Best);
            var worstIntConverted = parseInt(playersArr[i].Worst);
            var averageFloatConverted = parseFloat(playersArr[i].Avg);
            var stdDevFloatConverted = parseFloat(playersArr[i].StdDev);

            var createPlayerValueVariables = {
              best: bestIntConverted,
              worst: worstIntConverted,
              average: averageFloatConverted,
              divisor: playersArr[i].Divisor,
              standardDeviation: stdDevFloatConverted,
              value: playersArr[i].Value
            }

            // now that the player has been created, create a player value record
            var createdPlayerValueId = await createPlayerValue(createPlayerValueVariables);
            connectPlayerValueAndPlayerByIds(createdPlayerId, createdPlayerValueId);
        }
        // there is one matching record
        else if (matchingPlayerArr.length === 1){
          // check to see if the team name has changed
          playerTeamFromFantasyPros = playersArr[i].Team;
          playerTeamFromGraphcool = matchingPlayerArr[0].realTeam;

           if(playerTeamFromFantasyPros != playerTeamFromGraphcool){
             // this means that the player was traded or changed teams, update the team
            
           }
             // no changes and a matching player, just save the player value
             var bestIntConverted = parseInt(playersArr[i].Best);
             var worstIntConverted = parseInt(playersArr[i].Worst);
             var averageFloatConverted = parseFloat(playersArr[i].Avg);
             var stdDevFloatConverted = parseFloat(playersArr[i].StdDev);

             var createPlayerValueVariables = {
              best: bestIntConverted,
              worst: worstIntConverted,
              average: averageFloatConverted,
              divisor: playersArr[i].Divisor,
              standardDeviation: stdDevFloatConverted,
              value: playersArr[i].Value
            }

              var createdPlayerValueId = await createPlayerValue(createPlayerValueVariables);
              connectPlayerValueAndPlayerByIds(matchingPlayerArr[0].id, createdPlayerValueId);
                  
          //console.log("Matching record for " + playerFullName);
        }
        else if(matchingPlayerArr.length > 1){
          // this means that there are matching players with excat names
        }
      }
}

module.exports = createPlayerValueGraphcool;