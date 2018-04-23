var graphqlConfigObject = require('../config/graphcool-config');
var graphqlEndpoint = graphqlConfigObject.url;
const { request } = require('graphql-request');

var addToPlayerPlayerValue = require('../graphql-queries/addToPlayerPlayerValue');

const connectPlayerValueAndPlayerByIds = async (playerId, playerValueId) => {
    var connectPlayerAndPlayerValueVariables = {
        playerId: playerId,
        playerValueId: playerValueId
      }

      var connectedValueAndPlayerInformation;

      await request(graphqlEndpoint, addToPlayerPlayerValue, connectPlayerAndPlayerValueVariables).then(data => {
        connectedValueAndPlayerInformation = data.addToPlayerValueOnPlayer;
      });

      return connectedValueAndPlayerInformation;
}

module.exports = connectPlayerValueAndPlayerByIds;