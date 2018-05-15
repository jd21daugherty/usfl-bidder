
var graphcoolClient = require('../config/graphcool-config');
const { request } = require('graphql-request');

var getPlayerDataQuery = require('../graphql-queries/getPlayerDataQuery');

const getAllPlayersForPosition = async (positionVariableObject) => {
    var allPlayers = [];
    await graphcoolClient.request(getPlayerDataQuery, positionVariableObject).then(players => {
        //console.log(players.allPlayers);
        allPlayers = players.allPlayers;
    });
    return allPlayers
}

module.exports = getAllPlayersForPosition;