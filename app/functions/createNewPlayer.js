var graphqlConfigObject = require('../config/graphcool-config');
var graphqlEndpoint = graphqlConfigObject.url;
const { request } = require('graphql-request');

var createNewPlayerMutation = require('../graphql-queries/createNewPlayerMutation');

const createNewPlayer = async (createNewPlayerVariableObject) => {
    var createdPlayerId;
    await request(graphqlEndpoint, createNewPlayerMutation, createNewPlayerVariableObject).then(data => {
        createdPlayerId = data.createPlayer.id;
    });
    return createdPlayerId;
}

module.exports = createNewPlayer;