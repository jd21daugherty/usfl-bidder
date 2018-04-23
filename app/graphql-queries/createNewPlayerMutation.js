const createNewPlayerMutation = `
mutation CreateNewPlayer(
    $firstName: String!, 
    $lastName: String!,
    $position: String!,
      $realTeam: String
      ){
    createPlayer(
      firstName: $firstName
      lastName: $lastName
      position: $position
      realTeam: $realTeam
      signedStatus: false
    ){
      id
      firstName
      lastName
      realTeam
    }
  }
`;

module.exports = createNewPlayerMutation;