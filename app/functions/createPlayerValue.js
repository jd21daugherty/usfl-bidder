
var graphcoolClient = require('../config/graphcool-config');
const { request } = require('graphql-request');

var createNewPlayerValueAndReturnId = require('../graphql-queries/createNewPlayerValueAndReturnId');

const createPlayerValue = async (createPlayerValueVariables) => {
    var playerValueId;
    await graphcoolClient.request(createNewPlayerValueAndReturnId, createPlayerValueVariables).then(data => {
        //console.log(data);
        // now return the playervalue id 
        playerValueId = data.createPlayerValue.id;
      });
    return playerValueId
}

module.exports = createPlayerValue;