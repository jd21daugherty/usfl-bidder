
const getPlayerDataQuery = `
query GetPlayerData($position: String){
  allPlayers(filter: {
    position_contains: $position
  }){
    id
    firstName
    lastName
    position
    realTeam
  }
}
`;

module.exports = getPlayerDataQuery;