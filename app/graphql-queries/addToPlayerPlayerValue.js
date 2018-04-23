const addToPlayerValueOnPlayer = `
mutation AddToPlayerPlayerValue(
    $playerId: ID!
    $playerValueId: ID!
  ){
    addToPlayerValueOnPlayer(
      playerPlayerId: $playerId
      playerValuesPlayerValueId: $playerValueId
    ){
      playerPlayer{
        firstName
        lastName
      }
      playerValuesPlayerValue{
        value
      }
    }
  }
`;

module.exports = addToPlayerValueOnPlayer;

