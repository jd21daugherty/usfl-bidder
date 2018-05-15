
var graphcoolClient = require('../config/graphcool-config');
const { request } = require('graphql-request');

var addToPlayerPlayerValue = require('../graphql-queries/addToPlayerPlayerValue');

const connectPlayerValueAndPlayerByIds = async (playerId, playerValueId) => {
    var connectPlayerAndPlayerValueVariables = {
        playerId: playerId,
        playerValueId: playerValueId
      }

      var connectedValueAndPlayerInformation;

      await graphcoolClient.request(addToPlayerPlayerValue, connectPlayerAndPlayerValueVariables).then(data => {
        connectedValueAndPlayerInformation = data.addToPlayerValueOnPlayer;
      });

      return connectedValueAndPlayerInformation;
}

module.exports = connectPlayerValueAndPlayerByIds;