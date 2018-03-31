module.exports = function getWrDivisor(avgRank){
    var divisor = 0;
    if (avgRank <= 15){
      divisor = divisor + 4
    }
    else if (avgRank > 15 && avgRank <= 30){
      divisor = divisor + 4.5
    }
    else if (avgRank > 30 && avgRank <= 50) {
      divisor = divisor + 4.75
    }
    else if (avgRank > 50 && avgRank <= 75){
      divisor = divisor + 5
    }
    else if (avgRank > 75 && avgRank <= 100){
      divisor = divisor + 5.25
    }
    else {
      divisor = divisor + 5.5
    }
  
    return divisor;
  }