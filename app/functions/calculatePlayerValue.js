
module.exports = function calculatePlayerValue(divisor, bestRank, worstRank){
    return playerValue = Math.floor(((100 - bestRank) + (100 - worstRank)) / divisor);
  }