const createNewPlayerValueAndReturnId = `
mutation CreateNewPlayerValueAndReturnId(
  $best: Int!,
  $worst: Int!,
  $average: Float!,
  $divisor: Float!,
  $standardDeviation: Float!,
  $value: Int!
){
  createPlayerValue(
    best: $best
    worst: $worst
    average: $average
    divisor: $divisor
    stdandardDeviation: $standardDeviation
    value: $value
  ){
    id
  }
}
`;

module.exports = createNewPlayerValueAndReturnId;