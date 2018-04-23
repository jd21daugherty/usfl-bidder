var graphqlConfigObject = require('../config/graphcool-config');
var graphqlEndpoint = graphqlConfigObject.url;
const { request } = require('graphql-request');

var getPlayerDataQuery = require('../graphql-queries/getPlayerDataQuery');

const getAllPlayersForPosition = async (positionVariableObject) => {
    var allPlayers = [];
    await request(graphqlEndpoint, getPlayerDataQuery, positionVariableObject).then(players => {
        allPlayers = players.allPlayers;
    });
    return allPlayers
}

module.exports = getAllPlayersForPosition;