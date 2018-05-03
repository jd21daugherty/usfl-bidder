
var graphcoolClient = require('../config/graphcool-config');
const { request } = require('graphql-request');

var createNewPlayerMutation = require('../graphql-queries/createNewPlayerMutation');

const createNewPlayer = async (createNewPlayerVariableObject) => {
    var createdPlayerId;
    await graphcoolClient.request(createNewPlayerMutation, createNewPlayerVariableObject).then(data => {
        createdPlayerId = data.createPlayer.id;
    });
    return createdPlayerId;
}

module.exports = createNewPlayer;