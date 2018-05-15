const { GraphQLClient } = require('graphql-request');

var graphcoolConfig = {
    url: 'https://api.graph.cool/simple/v1/cjglj2j7j1jmw01176c2cl8wy',
    rootToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MjUzMDIwMjcsImNsaWVudElkIjoiY2plZ2lyZ2toMTA0cjAxMThvMTZlejU4diIsInByb2plY3RJZCI6ImNqZ2xqMmo3ajFqbXcwMTE3NmMyY2w4d3kiLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNqZ3BwZzBoNWFieHEwMTUxbzdkNmNtdGQifQ.uyQcA_PlAC0Zmih2T8qDqYM1ltih6vkwDlrS5YX3KOs'
}

const graphcoolClient = new GraphQLClient(graphcoolConfig.url, {
    headers: {
      Authorization: graphcoolConfig.rootToken,
    },
  });

module.exports = graphcoolClient;